import express from "express";
import { createPost, getPosts, getPost, updatePost, deletePost } from "../controllers/post.cont.js";
import { verifyToken, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Public: Fetch all posts
router.get("/", getPosts);

// ✅ Public: Fetch a single post by ID
router.get("/:slug", getPost);

// ✅ Protected: Create a post (Only logged-in users)
router.post("/", verifyToken, createPost);

// ✅ Protected: Update a post (Only the owner or an admin)
router.put("/:id", verifyToken, updatePost);

// ✅ Protected: Delete a post (Only admins)
router.delete("/:id", verifyToken, admin, deletePost);

export default router;
