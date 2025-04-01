import Topic from '../models/topic.js';

// Get all topics
export const getTopics = async (req, res) => {
  try {
    const topics = await Topic.find();
    res.json(topics);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// 🟢 Create a new topic
export const createTopic = async (req, res) => {
    const { title, description } = req.body;
  
    if (!title || !description) {
      return res.status(400).json({ error: "Title and description are required" });
    }
  
    try {
      const newTopic = new Topic({ title, description, comments: [] });
      await newTopic.save();
      res.status(201).json(newTopic);
    } catch (error) {
      res.status(500).json({ error: "Failed to create topic" });
    }
  };

// Add comment to a topic
export const addComment = async (req, res) => {
  const { topicId } = req.params;
  const { user, text } = req.body;

  try {
    const topic = await Topic.findById(topicId);
    topic.comments.push({ user, text });
    await topic.save();
    res.json(topic);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Search topics based on a keyword
export const searchTopics = async (req, res) => {
  const { keyword } = req.query;
  try {
    const topics = await Topic.find({
      $or: [
        { title: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
      ],
    });
    res.json(topics);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
