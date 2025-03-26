import express from "express";
import {
  getPosts,
  getPost,
  createPost,
  deletePost,
  uploadAuth,
  featurePost,
} from "../controllers/post.cont.js";
import increaseVisit from "../middleware/increaseVisit.js";

const router = express.Router();
// thisis  ssk
router.get("/upload-auth", uploadAuth);

router.get("/", getPosts);
router.get("/:slug", increaseVisit, getPost);
router.post("/", createPost);
router.delete("/:id", deletePost);
router.patch("/feature", featurePost);

export default router;