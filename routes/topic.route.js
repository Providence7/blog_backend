import express from 'express';
import Topic from '../models/topic.js';  // Import the Topic model
import ImageKit from "imagekit";

const router = express.Router();
const
 imagekit 
=
 
new
 
ImageKit
(
{

    publicKey 
:
 
process.env.IK_PUBLIC_KEY
,

    privateKey 
:
 
process.env.IK_PRIVATE_KEY
,

    urlEndpoint 
:
 
process.env.IK_URL_ENDPOINT

}
)
;
// Image upload route using ImageKit
router.post('/upload-image', async (req, res) => {
  try {
    const { file } = req.body; // Expect the file from the frontend

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Upload the file to ImageKit
    const uploadResponse = await imagekit.upload({
      file: file, // The image file data (Base64 or binary)
      fileName: `topic-${Date.now()}.jpg`, // You can customize this naming
    });

    // Return the image URL
    res.json({ imageUrl: uploadResponse.url });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

// Fetch all topics
router.get('/', async (req, res) => {
  try {
    const topics = await Topic.find();
    res.json(topics);
  } catch (err) {
    console.error('Error fetching topics:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Create a new topic
router.post('/', async (req, res) => {
  try {
    const { title, description, userId, imageUrl } = req.body;

    // Check if all required fields are provided
    if (!title || !description || !userId) {
      return res.status(400).json({ error: 'Title, description, and userId are required' });
    }

    // Create a new Topic
    const newTopic = new Topic({
      title,
      description,
      userId,
      imageUrl, // Add image URL to topic
    });

    // Save topic to the database
    await newTopic.save();

    // Respond with the newly created topic
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
  // DELETE a topic by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTopic = await Topic.findByIdAndDelete(id); // Find and delete topic by ID
    if (!deletedTopic) {
      return res.status(404).json({ message: 'Topic not found' });
    }
    res.status(200).json({ message: 'Topic deleted successfully' });
  } catch (error) {
    console.error('Error deleting topic:', error);
    res.status(500).json({ error: 'Failed to delete topic' });
  }
});
// DELETE a specific comment from a topic
router.delete('/:topicId/comments/:userId/:commentText', async (req, res) => {
  const { topicId, userId, commentText } = req.params;
  
  console.log('Deleting comment with:', { topicId, userId, commentText });

  try {
    // Find the topic by its ID
    const topic = await Topic.findById(topicId);
    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }

    // Log current comments in the topic
    console.log('Current comments:', topic.comments);

    // Filter out the comment from the comments array
    topic.comments = topic.comments.filter(comment => 
      comment.userId !== userId || 
      decodeURIComponent(comment.text).toLowerCase() !== decodeURIComponent(commentText).toLowerCase()
    );

    // Log after filtering the comments
    console.log('Filtered comments:', topic.comments);

    // Save the updated topic
    await topic.save();

    // Log the saved topic
    console.log('Saved topic:', topic);

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ error: 'Failed to delete comment' });
  }
});

  
export default router;
