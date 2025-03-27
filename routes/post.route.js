import express from "express";
import {
  getPosts,
  getPost,
  createPost,
  deletePost,
  uploadAuth,
  featurePost,
  updateUser,
} from "../controllers/post.cont.js";
import increaseVisit from "../middleware/increaseVisit.js";

const router = express.Router();
// thisis  ssk
router.get("/upload-auth", uploadAuth);

router.get("/", getPosts);
router.get("/:slug", increaseVisit, getPost);
router.post("/", createPost);
router.delete("/:id", deletePost);
router.put("/:slug", updateUser);

export default router;