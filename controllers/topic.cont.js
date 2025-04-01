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
