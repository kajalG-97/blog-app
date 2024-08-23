import { Comment } from "../models/Post.js";

export const addCommentToPost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user._id;

    console.log(req.params);

    if (!postId || !req.body.content) {
      return res
        .status(400)
        .json({ message: "Post ID and content are required." });
    }

    const comment = await Comment.create({
      post: postId,
      author: userId,
      content: req.body.content,
    });

    return res.status(200).json({ comment });
  } catch (error) {
    return res.status(500).json({
      message: "failed",
      error,
    });
  }
};

export const updateComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const userId = req.user._id;

    const comment = await Comment.findOneAndUpdate(
      { _id: commentId, author: userId },
      { content },
      { new: true, runValidators: true }
    ).populate("author");

    if (!comment) {
      return res
        .status(404)
        .json({ message: "Comment not found or user not authorized" });
    }

    return res.status(200).json({ comment });
  } catch (error) {
    return res.status(500).json({
      message: "failed",
      error,
    });
  }
};
export const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const userId = req.user._id;

    const comment = await Comment.findOneAndDelete({
      _id: commentId,
      author: userId,
    });

    if (!comment) {
      return res
        .status(404)
        .json({ message: "Comment not found or user not authorized" });
    }

    return res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "failed",
      error,
    });
  }
};
