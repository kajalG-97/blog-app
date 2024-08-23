import express from "express";
import {
  addCommentToPost,
  deleteComment,
  updateComment,
} from "../controllers/commentController.js";

const router = express.Router();

router.post("", addCommentToPost);
router.put("/:commentId", updateComment);
router.delete("/:commentId", deleteComment);

export default router;
