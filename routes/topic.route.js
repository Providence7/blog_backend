import express from 'express';
import { getTopics, addComment, searchTopics, createTopic } from '../controllers/topic.cont.js';

const router = express.Router();

// Get all topics
router.get('/topics', getTopics);

// Add comment to a topic
router.post('/:topicId/comments', addComment);

// Search topics
router.get('/search', searchTopics);
router.post("/topics", createTopic);


export default router;
