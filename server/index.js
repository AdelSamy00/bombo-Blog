import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import sessions from 'express-session';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { default as connectMongoDBSession } from 'connect-mongodb-session';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import router from './routes/index.js';
import { User } from './models/User.js';
import { Post } from './models/Post.js';
import { Friend } from './models/Friend.js';
import errorMiddleware from './middleware/errorMiddleware.js';

const app = express();
dotenv.config();
const jwtSecret = process.env.JWT_SECRET;
const mongoURL = process.env.MONGODB_URL;
const oneDay = 1000 * 60 * 60 * 24;
const MongoDBStore = connectMongoDBSession(sessions);
app.set('trust proxy', 1);
app.use(cookieParser());

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

app.use(helmet());
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
    optionSuccessStatus: 200,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

mongoose.connect(mongoURL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});
app.use(errorMiddleware);
app.use(router);

app.listen(3000, () => {
  try {
    console.log('Server Running on 3000.');
  } catch (error) {
    console.log(error);
  }
});
