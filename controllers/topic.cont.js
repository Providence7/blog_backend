import Topic from '../models/topic.js'; // Import the Topic model

// Get all topics
export const getAllTopics = async (req, res) => {
  try {
    const topics = await Topic.find();
    res.json(topics);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching topics' });
  }
};

// Create a new topic
export const createTopic = async (req, res) => {
  try {
    const newTopic = new Topic(req.body);
    await newTopic.save();
    res.status(201).json(newTopic);
  } catch (error) {
    res.status(500).json({ message: 'Error creating topic' });
  }
};

// Add a comment to a topic


// Controller to handle comment addition
const addComment = async (req, res) => {
  try {
    const { topicId, comment } = req.body; // Destructure comment data from the request body

    // Find the topic by ID and add the new comment
    const topic = await Topic.findById(topicId);

    // Push the new comment to the comments array
    topic.comments.push({
      username: comment.username, // Store only the username
      text: comment.text, // Store the comment text
    });

    // Save the updated topic
    await topic.save();

    // Return the updated comments to the client
    res.status(200).json({ comments: topic.comments });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ error: "Failed to add comment" });
  }
};

export { addComment };
