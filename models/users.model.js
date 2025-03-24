import { Schema } from "mongoose";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    required: true,
  },

},{timestamps : true}
);
export default mongoose.model("User", userSchema);