import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  user: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const topicSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    comments: [commentSchema], 
  },
  { timestamps: true }
);

const Topic = mongoose.model('Topic', topicSchema);

// Function to seed dummy data
const seedTopics = async () => {
  const existingTopics = await Topic.find();
  if (existingTopics.length === 0) {
    await Topic.insertMany([
      {
        title: "How to choose the right fabric?",
        description: "I'm new to tailoring. What are the best fabrics for beginners?",
        comments: [
          { user: "Alice", text: "Cotton is a great choice for beginners!" },
          { user: "Bob", text: "Avoid slippery fabrics like silk when starting out." }
        ]
      },
      {
        title: "Thread quality for sewing",
        description: "Which brand of threads do you recommend for durable stitches?",
        comments: [
          { user: "Charlie", text: "Gutermann threads are excellent!" },
          { user: "Diana", text: "Make sure to match thread type with fabric weight." }
        ]
      }
    ]);
    console.log("Dummy topics added!");
  }
};

// Call the function when the model is loaded
seedTopics();

export default Topic;
