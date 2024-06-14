import express from "express";
import { addCommentToPost } from "../controllers/commentController.js";

const router = express.Router();

router.post("/", addCommentToPost);

export default router;
