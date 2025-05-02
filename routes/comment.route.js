import express from "express";
import mongoose from "mongoose";
// import Post from "../models/posts.model.js"
import Comment from "../models/comments.model.js"; // Import Comment model

const router = express.Router()
router.post("/comments", async (req, res) => {
  try {
    const { googleId, name, email, comment, postId } = req.body;

    // Ensure postId (slug) exists in Post collection
    const postExists = await mongoose.model("Post").findOne({ slug: postId });
    if (!postExists) return res.status(404).json({ error: "Post not found" });

    const newComment = new Comment({ googleId, name, email, comment, postId });
    await newComment.save();
    res.status(201).json({ message: "Comment saved successfully", newComment });
  } catch (error) {
    res.status(500).json({ error: "Failed to save comment" });
  }
});

// ✅ Fetch Comments by Post ID (Slug)
// GET all comments
router.get("/comments", async (req, res) => {
  try {
    const comments = await Comment.find().sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch comments." });
  }
});

// GET comments for a specific post
router.get("/comments/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const comments = await Comment.find({ postId: slug }).sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});

// DELETE a specific comment by postId and email
router.delete("/comments/:slug/:email", async (req, res) => {
  const { slug, email } = req.params;
  try {
    const result = await Comment.findOneAndDelete({ postId: slug, email });
    if (!result) return res.status(404).json({ message: "Comment not found." });
    res.status(200).json({ message: "Comment deleted." });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete comment." });
  }
});



export default router