import mongoose from "mongoose";

const Schema = mongoose.Schema;

const likeSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  post: { type: Schema.Types.ObjectId, ref: "Post" },
});

const commentSchema = new Schema({
  content: String,
  author: { type: Schema.Types.ObjectId, ref: "User" },
  post: { type: Schema.Types.ObjectId, ref: "Post" },
  // parentComment: { type: Schema.Types.ObjectId, ref: "Comment", default: null },
  replies: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

const postSchema = new Schema({
  title: String,
  content: String,
  author: { type: Schema.Types.ObjectId, ref: "User" },
  likes: [{ type: Schema.Types.ObjectId, ref: "Like" }],
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

export const Comment = mongoose.model("Comments", commentSchema);
export const Post = mongoose.model("Posts", postSchema);
export const Like = mongoose.model("Likes", likeSchema);
