import { Post } from "../models/Post.js";

export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const author = req.user._id; // Assuming req.user contains the authenticated user's info

    // Create the post with the author field
    const post = await Post.create({ title, content, author });
    return res.status(200).json({ post });
  } catch (error) {
    return res.status(500).json({
      message: "create failed",
      error: error.message, // Include error message for better debugging
    });
  }
};

export const updatePost = async (req, res) => {
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
    const { page = 1, limit = 10, postTitle, startDate, endDate } = req.query;
    const skip = (page - 1) * limit;

    let filter = {};
    if (postTitle) {
      filter.postTitle = postTitle; // Filter by postTitle
    }

    if (startDate && endDate) {
      filter.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) }; // Filter by date range
    }

    const posts = await Post.find(filter)
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
      .lean() // Convert the Mongoose document to a plain JavaScript object
      .skip(skip) // Skip a specified number of results (pagination)
      .limit(limit)
      .sort({ createdAt: -1 }) // Sort results by the creation date in descending order
      .exec(); // Execute the query

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
    const postId = req.params.postId;
    const userId = req.user._id; // Assuming req.user contains the authenticated user's info

    // Retrieve the post
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the user is the author of the post

    if (post.author.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "User not authorized to delete this post" });
    }

    // Delete the post
    await Post.deleteOne({ _id: postId });
    return res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Delete failed",
      error: error.message, // Include error message for better debugging
    });
  }
};
