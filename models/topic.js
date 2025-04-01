import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  user: String,
  text: String,
});

const topicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  comments: [commentSchema],
});

const Topic = mongoose.model('Topic', topicSchema);
export default Topic;
