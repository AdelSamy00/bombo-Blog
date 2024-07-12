import express from 'express';
import userRoutes from './userRoutes.js';
import postRoutes from './postRoutes.js';
import friendsRoutes from './friendsRoutes.js';

const router = express.Router();

router.use(`/api/user`, userRoutes);

router.use(`/api/post`, postRoutes);

router.use(`/api/friends`, friendsRoutes);

export default router;
