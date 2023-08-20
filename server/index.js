import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import sessions from 'express-session';
import { default as connectMongoDBSession } from 'connect-mongodb-session';
import { User } from './models/User.js';

const app = express();
dotenv.config();
const jwtSecret = process.env.JWT_SECRET;
const bcryptSalt = bcrypt.genSaltSync(10);
const mongoURL = process.env.MONGO_URL;
const oneDay = 1000 * 60 * 60 * 24;
const MongoDBStore = connectMongoDBSession(sessions);
app.set('trust proxy', 1);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
const store = new MongoDBStore({
  uri: mongoURL,
  collection: 'mySessions',
});
store.on('error', function (error) {
  console.log(error);
});
app.use(
  sessions({
    secret: jwtSecret,
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
    store: store,
  })
);
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
    optionSuccessStatus: 200,
  })
);

mongoose.connect(mongoURL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

const isAuth = (req, res, next) => {
  if (req.session.isAuth) {
    next();
  } else {
    res.status(501).json({ message: 'you arenot auther' });
  }
};
//--------------------------------------user endpoint--------------------------------------
//register
app.post('/register', async (req, res) => {
  console.log(req.body);
  const { username, email, password, birthDate, gender } = req.body;
  console.log(username, email, password, birthDate, gender);
  try {
    const hashedPassword = bcrypt.hashSync(password, bcryptSalt);
    const user = await User.findOne({ email });
    if (user) {
      res
        .status(500)
        .json({ message: 'there found anthor user using this email' });
    } else {
      const createdUser = await User.create({
        username,
        password: hashedPassword,
        email,
        birthDate,
        gender,
      });

      jwt.sign({ id: createdUser._id }, jwtSecret, {}, (err, token) => {
        if (err) throw err;
        req.session.isAuth = true;
        res
          .cookie('token', token, { sameSite: 'none', secure: true })
          .status(201)
          .json({
            id: createdUser._id,
            token,
          });
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//profile
app.get('/profile', isAuth, (req, res) => {
  res.status(200).json({ message: 'you are auther' });
});

//login
app.post('/login', async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  console.log(email, password);
  const foundUser = await User.findOne({ email });
  if (foundUser) {
    const passOk = bcrypt.compareSync(password, foundUser.password);
    if (passOk) {
      jwt.sign({ id: foundUser._id }, jwtSecret, {}, (err, token) => {
        req.session.isAuth = true;
        res
          .status(200)
          .cookie('token', token, { sameSite: 'none', secure: true })
          .json({
            id: foundUser._id,
            username: foundUser.username,
            token,
          });
      });
    } else {
      res
        .status(401)
        .json({ message: 'pleases check your password or email again' });
    }
  } else {
    res.status(404).json({ message: 'there arenot found any user' });
  }
});

//logout
app.post('/logout', (req, res) => {
  req.session.destroy();
  res.status(200);
});

app.listen(3000, () => {
  try {
    console.log('Server Running on 3000.');
  } catch (error) {
    console.log(error);
  }
});
