import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { addPosts, getAllPosts } from '../controllers/postControllers.js';

const dirname = path.dirname(fileURLToPath(import.meta.url));

//posts images path
export const uploadPostPath = path.join(
  dirname,
  '..',
  '..',
  '..',
  'Blog',
  'client',
  'public',
  'posts',
  '/'
);
const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith('image')) {
    callback(null, true);
  } else {
    callback(null, Error('only image is allowed'));
  }
};

const postStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, uploadPostPath);
  },
  filename: (req, file, callback) => {
    callback(null, `image-${Date.now()}-${file.originalname}`);
  },
});
let uploadPost = multer({
  storage: postStorage,
  fileFilter: isImage,
});
const router = express.Router();

router.post('/', uploadPost.single('postImage'), addPosts);
router.get('/', getAllPosts);

export default router;
