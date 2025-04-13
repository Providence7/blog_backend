
import mongoose from 'mongoose';

const TopicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  comments: [
    {
      userId: String,
      username: String,
      text: String,
    }
  ]
});
export default mongoose.model("Topic", TopicSchema)
