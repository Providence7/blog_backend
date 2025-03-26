import mongoose from "mongoose";
import { Schema } from "mongoose";
const commentSchema  =  new Schema(
  {
    googleId: { type: String, required: true }, // User ID from Google
    name: { type: String, required: true }, // Display name
    email: { type: String, required: true }, // Email for identity
    comment: { type: String, required: true }, // Comment content
    postId: { type: String, required: true, ref: "Post" }, // Link comment to the post using slug

    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Commment", commentSchema)
