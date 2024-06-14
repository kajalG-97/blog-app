// create post
// update - put
// get - posts
// delete - by author, not user

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
        message: "post not found",
      });
    }

    return res.status(200).json({ post });
  } catch (error) {
    return res.status(500).json({
      message: "update failed",
      error,
    });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author")
      .populate({ path: "likes" })
      .lean()
      //   .populate({
      //     path: "likes",
      //     populate: { path: "user" },
      //   })
      //   .populate({
      //     path: "comments",
      //     populate: [
      //       { path: "author" },
      //       { path: "replies", populate: { path: "author" } },
      //     ],
      //   })
      .exec();
    // const post = await Post.find().populate("author").exec();
    //   .populate({
    //     path: "comments",
    //     populate: [
    //       { path: "author" },
    //       { path: "replies", populate: { path: "author" } },
    //     ],
    //   });
    //   .lean().limit(10)
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
