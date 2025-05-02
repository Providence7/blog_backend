import mongoose from "mongoose";

const userSchema =new mongoose.Schema(
  {
    googleId: { type: String, required: true, unique: true }, // Google ID
    email: { type: String, required: true, unique: true }, // User email
    username: { type: String, required: true }, // Display name
  },
  { timestamps: true }
);

export default mongoose.model("List", userSchema);