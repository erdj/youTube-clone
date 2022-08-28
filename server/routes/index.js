import express from 'express';
import userRouter from './userRouter.js';
import videoRouter from './videoRouter.js';
import commentRouter from './commentRouter.js';
import authRouter from './authRouter.js';
const router = express.Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/videos', videoRouter);
router.use('/comments', commentRouter);

export default router;
