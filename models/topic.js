import { Schema } from "mongoose";
import mongoose from "mongoose";

const commSchema = new mongoose.Schema({
  user: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const topicSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    comments: [commSchema], 
  },
  { timestamps: true }
);

export default mongoose.model("Topic", topicSchema);
