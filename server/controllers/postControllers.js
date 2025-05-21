const Post = require("../models/Post");
const User = require("../models/User");
const Challenge = require("../models/Challenge");

exports.createPost = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send({
        message: "Response body is required.",
      });
    }
    const { challengeId } = req.params;

    console.log("Challenge ID: ", challengeId);

    const { title, description, img, votes, is_winner } = req.body;

    const user_id = req.session.userId;

    console.log("User ID: ", user_id);

    // if (!user_id) {
    //   return res.status(401).send({
    //     message: "You must be logged in to create a post.",
    //   });
    // }

    if (!title) {
      return res.status(400).send({
        message: "Title is required.",
      });
    }

    const post = await Post.create({
      title,
      description,
      img,
      votes,
      is_winner,
      user_id,
      challenge_id: challengeId,
    });

    req.session.postId = post.id;

    return res.status(200).send({
      id: post.id,
      title: post.title,
      description: post.description,
      img: post.img,
      votes: post.votes,
      winner: post.is_winner,
      user_id: post.user_id,
      challenge_id: post.challenge_id,
    });
  } catch (error) {
    console.error("Error creating post: ", error);
    return res.status(500).send({
      message: "An error occurred while registering the post.",
    });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, img } = req.body;

    const updatedPost = await Post.editPost({
      title,
      description,
      img,
      id,
    });

    if (!updatedPost) {
      return res.status(404).send({
        message: "Error: post not found.",
      });
    }

    return res.status(200).send({
      message: "Post updated successfully.",
    });
  } catch (error) {
    console.error("Error updating post: ", error);
    return res.status(500).send({
      message: "An error occurred while updating the post.",
    });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const getPosts = await Post.list();
    return res.status(200).send(getPosts);
  } catch (error) {
    console.error("Error fetching posts: ", error);
    return res.status(500).send({
      message: "An error occurred while fetching posts.",
    });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const postId = await Post.find(id);
    if (!postId) {
      return res.status(404).send({
        message: "Post not found.",
      });
    }

    return res.status(200).send(postId);
  } catch (error) {
    console.error("Error fetching post by ID: ", error);
    return res.status(500).send({
      message: "An error occurred while fetching the post.",
    });
  }
};

exports.getPostByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;
    const user = await User.find(user_id);
    if (!user) {
      return res.status(400).send({
        message: "User ID is missing.",
      });
    }

    const posts = await Post.findByUser(user_id);
    if (!posts) {
      return res.status(404).send({
        message: "No posts found for this user.",
      });
    }

    return res.status(200).send({
      posts,
    });
  } catch (error) {
    console.error("Error fetching posts: ", error);
    return res.status(500).send({
      message: "An error occurred while fetching posts.",
    });
  }
};

exports.getPostByChallengeId = async (req, res) => {
  try {
    const { challengeId } = req.params;
    const challenge = await Challenge.find(challengeId);
    if (!challenge) {
      return res.status(400).send({
        message: "Challenge ID is missing.",
      });
    }

    const posts = await Post.findByChallenge(challengeId);
    if (!posts) {
      return res.status(404).send({
        message: "No posts found for this challenge.",
      });
    }

    return res.status(200).send({
      posts,
    });
  } catch (error) {
    console.error("Error fetching posts: ", error);
    return res.status(500).send({
      message: "An error occurred while fetching posts.",
    });
  }
};
