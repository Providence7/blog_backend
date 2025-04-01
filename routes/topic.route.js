import express from 'express';
import { getTopics, addComment, searchTopics } from '../controllers/topic.cont.js';

const router = express.Router();

// Get all topics
router.get('/', getTopics);

// Add comment to a topic
router.post('/:topicId/comments', addComment);

// Search topics
router.get('/search', searchTopics);

export default router;
