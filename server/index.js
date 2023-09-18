import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import sessions from 'express-session';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { default as connectMongoDBSession } from 'connect-mongodb-session';
import bodyParser from 'body-parser';
import { User } from './models/User.js';
import { Post } from './models/Post.js';

const dirname = path.dirname(fileURLToPath(import.meta.url));
export const uploadPath = path.join(
  dirname,
  '..',
  '..',
  'Blog',
  'client',
  'public',
  'uploads',
  '/'
);
//posts images path
export const uploadPostPath = path.join(
  dirname,
  '..',
  '..',
  'Blog',
  'client',
  'public',
  'posts',
  '/'
);
//img storage confing
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, uploadPath);
  },
  filename: (req, file, callback) => {
    callback(null, `image-${Date.now()}-${file.originalname}`);
  },
});
//post Storage
const postStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, uploadPostPath);
  },
  filename: (req, file, callback) => {
    callback(null, `image-${Date.now()}-${file.originalname}`);
  },
});
//img filter
const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith('image')) {
    callback(null, true);
  } else {
    callback(null, Error('only image is allowed'));
  }
};
let upload = multer({
  storage: storage,
  fileFilter: isImage,
});
let uploadPost = multer({
  storage: postStorage,
  fileFilter: isImage,
});

console.log(uploadPath);
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
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
const store = new MongoDBStore({
  uri: mongoURL,
  collection: 'mySessions',
});
app.use('/uploads', express.static('./uploads'));
app.use(
  sessions({
    secret: jwtSecret,
    saveUninitialized: false,
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
    res.status(401).json({ message: 'you arenot auther' });
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
        req.session.userId = createdUser._id;
        req.session.userImage = createdUser.profileImage;
        res
          .cookie('token', token, { sameSite: 'none', secure: true })
          .status(201)
          .json({
            id: createdUser._id,
            image: createdUser.profileImage,
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
app.get('/profile', isAuth, async (req, res) => {
  const user = await User.findById(
    { _id: req.session.userId },
    { password: 0 }
  ).populate('posts');

  res.status(200).json({
    message: 'you are auther',
    user,
  });
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
        req.session.userId = foundUser._id;
        req.session.userImage = foundUser.profileImage;
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

// edit profile
app.post('/editProfile', upload.single('profileImage'), async (req, res) => {
  const formData = req.body;
  const profileImage = req.file;
  try {
    await User.findByIdAndUpdate(
      { _id: formData.id },
      {
        username: formData.username,
        birthDate: formData.birthDate,
        gender: formData.gender,
      }
    );
    if (profileImage) {
      await User.findByIdAndUpdate(
        { _id: formData.id },
        {
          profileImage: `./uploads/${profileImage.filename}`,
        }
      );
    }
    res.status(200).json({ message: 'Profile Updated.' });
  } catch (error) {
    res.status(400).json({ message: 'something went wrong.' });
  }
});

//add post
app.post('/addpost', uploadPost.single('postImage'), async (req, res) => {
  const postData = req.body;
  const postImage = req.file;
  const date = postData.createdAt.split('-');
  postData.createdAt = `${date[2]}-${date[1]}-${date[0]}`;
  console.log(postData, postImage);
  const user = await User.findById({ _id: postData.userid });
  let createdPost;
  if (postImage) {
    createdPost = await Post.create({
      body: postData.description,
      date: postData.createdAt,
      postImage: `./posts/${postImage.filename}`,
      user: user,
    });
  } else {
    createdPost = await Post.create({
      body: postData.description,
      createdAt: postData.createdAt,
      user: user,
    });
  }
  user.posts.push(createdPost);
  await user.save();
  console.log(user);
  res.status(200).json({ message: 'Added Successfully' });
});

//Get All Posts
app.get('/allPosts', async (req, res) => {
  const posts = await Post.find({})
    .populate('user', {
      username: 1,
      profileImage: 1,
      _id: 1,
    })
    .sort({ createdAt: -1 });
  res.status(200).json({ posts: posts });
});
//Display User Posts
/* app.get('/getUserPost', async (req, res) => {
  const userid = req.body;
  console.log(userid);
  try {
    const user = await User.findById({ _id: userid }).populate('posts');
    if (user) {
      res.status(200).json({ userPosts: user.posts });
    }
  } catch (error) {
    console.log(error);
  }
}); */
app.listen(3000, () => {
  try {
    console.log('Server Running on 3000.');
  } catch (error) {
    console.log(error);
  }
});
