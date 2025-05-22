const Comment = require("../models/Comment");
const Post = require("../models/Post");
const User = require("../models/User");

exports.createComment = async (req, res) => {
  console.log(req.body);
  try {
    if (!req.body) {
      return res.status(400).send({
        message: "Response body is required.",
      });
    }

    const { content, post_id, user_id, parent_comment_id } = req.body;

    if (!content) {
      return res.status(400).send({
        message: "Content is required.",
      });
    }

    const comment = await Comment.create({
      content,
      post_id,
      user_id,
      parent_comment_id,
    });
    // console.log(comment);
    req.session.commentId = comment.id;

    return res.status(200).send({
      id: comment.id,
      content: comment.content,
      post_id: comment.post_id,
      user_id: comment.user_id,
      parent_comment_id: comment.parent_comment_id,
    });
  } catch (error) {
    console.error("Error creating comment: ", error);
    return res.status(500).send({
      message: "An error occurred while registering the comment.",
    });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const updatedComment = await Comment.editComment({
      content,
      id,
    });

    if (!updatedComment) {
      return res.status(404).send({
        message: "Error: comment not found.",
      });
    }

    return res.status(200).send({
      message: "Comment updated successfully.",
    });
  } catch (error) {
    console.error("Error updating comment: ", error);
    return res.status(500).send({
      message: "An error occurred while updating the comment.",
    });
  }
};

exports.getAllComments = async (req, res) => {
  try {
    const getComments = await Comment.list();
    return res.status(200).send({
      comments: getComments,
    });
  } catch (error) {
    console.error("Error fetching comments: ", error);
    return res.status(500).send({
      message: "An error occurred while fetching comments.",
    });
  }
};

exports.getCommentById = async (req, res) => {
  try {
    const { id } = req.params;
    const commentId = await Comment.find(id);
    if (!commentId) {
      return res.status(404).send({
        message: "Comment not found.",
      });
    }

    return res.status(200).send(commentId);
  } catch (error) {
    console.error("Error fetching comment by ID: ", error);
    return res.status(500).send({
      message: "An error occurred while fetching the comment.",
    });
  }
};

exports.getCommentsByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;
    const user = await User.find(user_id);
    if (!user) {
      return res.status(400).send({
        message: "User ID is missing.",
      });
    }

    const comments = await Comment.findByUser(user_id);
    if (!comments) {
      return res.status(404).send({
        message: "No comments found for this user.",
      });
    }

    return res.status(200).send({
      comments,
    });
  } catch (error) {
    console.error("Error fetching comments: ", error);
    return res.status(500).send({
      message: "An error occurred while fetching comments.",
    });
  }
};

exports.getCommentsByPostId = async (req, res) => {
  try {
    const { post_id } = req.params;
    const post = await Post.find(post_id);
    if (!post) {
      return res.status(400).send({
        message: "Post ID is missing.",
      });
    }

    const comments = await Comment.findByPost(post_id);
    if (!comments) {
      return res.status(404).send({
        message: "No comments found for this post.",
      });
    }

    return res.status(200).send({
      comments,
    });
  } catch (error) {
    console.error("Error fetching comments: ", error);
    return res.status(500).send({
      message: "An error occurred while fetching comments.",
    });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("Deleting comment with ID:", id);

    const deletedComment = await Comment.delete({ id });
    if (!deletedComment) {
      return res.status(404).send({
        message: "Comment not found.",
      });
    }

    return res.status(200).send({
      message: "Comment deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting comment: ", error);
    return res.status(500).send({
      message: "An error occurred while deleting the comment.",
    });
  }
};
