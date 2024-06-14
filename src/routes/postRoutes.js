import express from "express";
import {
  createPost,
  deletePost,
  getPosts,
  updatePost,
} from "../controllers/postController.js";

const router = express.Router();

router.post("", createPost);
router.get("", getPosts);
router.put("/:postId", updatePost);
router.delete("/:postId", deletePost);

export default router;
