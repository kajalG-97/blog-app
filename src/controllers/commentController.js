import { Comment } from "../models/Post.js";

// exports.addCommentToPost = async (req, res) => {
//   const comment = new Comment({ ...req.body, post: req.params.postId });
//   await comment.save();
//   await Post.findByIdAndUpdate(req.params.postId, {
//     $push: { comments: comment._id },
//   });
//   res.send(comment);
// };

// exports.addReplyToComment = async (req, res) => {
//   const reply = new Comment({
//     ...req.body,
//     parentComment: req.params.commentId,
//   });
//   await reply.save();
//   await Comment.findByIdAndUpdate(req.params.commentId, {
//     $push: { replies: reply._id },
//   });
//   res.send(reply);
// };

export const addCommentToPost = async (req, res) => {
  try {
    const comment = await Comment.create(req.body);
    res.status(200).send(comment);
  } catch (error) {
    return res.status(500).send("error in comment", error);
  }
};
