
import mongoose from 'mongoose';

const TopicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String }, // 👈 New field to store the uploaded image URL
  comments: [
    {
      userId: String,
      username: String,
      text: String,
    }
  ]
});
export default mongoose.model("Topic", TopicSchema)
