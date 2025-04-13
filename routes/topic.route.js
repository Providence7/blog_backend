import express from 'express';
import Topic from '../models/topic.js';  // Import the Topic model

const router = express.Router();

// Fetch all topics
router.get('/', async (req, res) => {
  try {
    const topics = await Topic.find();  // Fetch all topics from the database
    res.json(topics);
  } catch (error) {
    console.error('Error fetching topics:', error);
    res.status(500).json({ error: 'Failed to load topics' });
  }
});

// Create a new topic
router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTopic = new Topic({
      title,
      description
    });
    await newTopic.save();
    res.status(201).json(newTopic);
  } catch (error) {
    console.error('Error creating topic:', error);
    res.status(500).json({ error: 'Failed to create topic' });
  }
});

// Add a comment to a topic
// Backend route example (assuming you're using express)
router.post('/:id/comments', async (req, res) => {
    const { id } = req.params;  // The :id will be available here
    const { comment } = req.body;
  
    try {
      const topic = await Topic.findById(id);  // Find the topic by ID
      if (!topic) {
        return res.status(404).json({ error: 'Topic not found' });
      }
  
      topic.comments.push(comment);  // Add the comment
      await topic.save();  // Save the updated topic
  
      res.json(topic);  // Return the updated topic
    } catch (error) {
      console.error("Error adding comment:", error);
      res.status(500).json({ error: 'Failed to add comment' });
    }
  });
  
  
export default router;
