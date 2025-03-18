// import Comment from "../models/comments.model.js";
// import User from "../models/users.model.js";
// import dotenv from "dotenv"
// dotenv.config()
// export const getPostComments = async (req, res) => {
//   const comments = await Comment.find({ post: req.params.postId })
//     .sort({ createdAt: -1 });

//   res.json(comments);
// };

// export const addComment = async (req, res) => {
  
//   const postId = req.params.postId;

 
//   const user = await User.findOne({ user});

//   const newComment = new Comment({
//     ...req.body,
//     user: user._id,
//     post: postId,
//   });

//   const savedComment = await newComment.save();

//   res.status(201).json(savedComment);
// };

// export const deleteComment = async (req, res) => {
//   const clerkUserId = req.auth.userId;
//   const id = req.params.id;

//   if (!clerkUserId) {
//     return res.status(401).json("Not authenticated!");
//   }

//   const role = req.auth.sessionClaims?.metadata?.role || "user";

//   if (role === "admin") {
//     await Comment.findByIdAndDelete(req.params.id);
//     return res.status(200).json("Comment has been deleted");
//   }

//   const user = User.findOne({ clerkUserId });

//   const deletedComment = await Comment.findOneAndDelete({
//     _id: id,
//     user: user._id,
//   });

//   if (!deletedComment) {
//     return res.status(403).json("You can delete only your comment!");
//   }

//   res.status(200).json("Comment deleted");
// };