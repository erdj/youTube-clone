import express from 'express';
import {
  deleteUser,
  dislike,
  getUser,
  like,
  subscribe,
  unsubscribe,
  update,
} from '../controllers/userController.js';
import { verifyToken } from '../verifyToken.js';
const router = express.Router();

// update user
router.put('/:id', verifyToken, update);

// delete user
router.delete('/:id', verifyToken, deleteUser);

// get a user
router.get('/find/:id', getUser);

// subscribe a user
// router.get('/sub/:id', verifyToken, subscribe);
router.get('/sub/:id', subscribe);

// unsubscribe a user
// router.get('/unsub/:id', verifyToken, unsubscribe);
router.get('/unsub/:id', unsubscribe);

// like a video
// router.put('/like/:videoId', verifyToken, like);
router.put('/like/:videoId', like);

// dislike a video
// router.put('/like/:videoId', verifyToken, dislike);
router.put('/like/:videoId', dislike);

export default router;
