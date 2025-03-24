import  express from 'express';
import  { getComments, postComment } from '../controllers/comment.cont.js';
import  { verifyToken } from '../middleware/authMiddleware.js';
const router = express.Router();

// Get comments for a specific post
router.get('/:postId', getComments);

// Post a comment for a specific post
router.post('/:postId', verifyToken, postComment);

export default router;
