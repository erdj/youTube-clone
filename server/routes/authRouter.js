import express from 'express';
const router = express.Router();
import { googleAuth, signIn, signUp } from '../controllers/authController.js';

//  CREATE A USER
router.post('/signup', signUp);
//  SIGN IN
router.post('/signin', signIn);
//  GOOGLE AUTH
router.post('/google', googleAuth);

export default router;
