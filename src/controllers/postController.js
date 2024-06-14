import { Post } from "../models/Post.js";

export const createPost = async (req, res) => {
  try {
    const post = await Post.create(req.body);
    return res.status(200).json({ post });
  } catch (error) {
    return res.status(500).json({
      message: "create failed",
      error,
    });
  }
};

export const updatePost = async (req, res) => {
  console.log("author: req.user._id", req.user._id, req.params.postId);
  try {
    // Find the post by id and author to ensure only the author can update it
    const post = await Post.findByIdAndUpdate(
      { _id: req.params.postId, author: { _id: req.user._id } },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).populate("author");

    if (!post) {
      return res.status(404).json({
        message: "Post not found or user not authorized",
      });
    }

    return res.status(200).json({ post });
  } catch (error) {
    return res.status(500).json({
      message: "Update failed",
      error,
    });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author")
      .populate({
        path: "likes",
        populate: { path: "user" }, // Populate user within likes
      })
      .populate({
        path: "comments",
        populate: [
          { path: "author" },
          { path: "replies", populate: { path: "author" } }, // Populate author within replies
        ],
      })
      .lean()
      .exec();

    return res.status(200).json({ posts });
  } catch (error) {
    return res.status(500).json({
      message: "get failed",
      error,
    });
  }
};

export const deletePost = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({
      message: "delete failed",
      error,
    });
  }
};
