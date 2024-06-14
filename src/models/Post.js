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
  replies: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

const postSchema = new Schema({
  title: String,
  content: String,
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  likes: [{ type: Schema.Types.ObjectId, ref: "Like" }],
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

export const Comment = mongoose.model("Comment", commentSchema);
export const Post = mongoose.model("Post", postSchema);
export const Like = mongoose.model("Like", likeSchema);
