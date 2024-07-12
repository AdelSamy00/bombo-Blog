import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  editProfile,
  getProfile,
  isAuth,
  login,
  logout,
  register,
} from '../controllers/userControllers.js';

const dirname = path.dirname(fileURLToPath(import.meta.url));
export const uploadPath = path.join(
  dirname,
  '..',
  '..',
  '..',
  'Blog',
  'client',
  'public',
  'uploads',
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
const router = express.Router();
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

router.get('/profile', isAuth, getProfile);
router.put('/', upload.single('profileImage'), editProfile);

export default router;
