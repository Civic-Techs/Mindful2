/* eslint-disable comma-dangle */
/// ////////////////////////////
// Imports /////////////////////
/// ////////////////////////////
require("dotenv").config();
const path = require("path");
const express = require("express");

// ------> middleware imports
const handleCookieSessions = require("./middleware/handleCookieSessions");
const checkAuthentication = require("./middleware/checkAuthentication");
const logRoutes = require("./middleware/logRoutes");
const logErrors = require("./middleware/logErrors");

// ------> controller imports
const authControllers = require("./controllers/authControllers");
const userControllers = require("./controllers/userControllers");
const app = express();
const challControllers = require("./controllers/challController");
const participantsControllers = require("./controllers/participantsControllers");
const postsControllers = require("./controllers/postControllers");
const commentsControllers = require("./controllers/commentControllers");

/// ////////////////////////////
// Middleware //////////////////
/// ////////////////////////////
app.use(handleCookieSessions); // adds a session property to each request representing the cookie
app.use(logRoutes); // print information about each incoming request
app.use(express.json()); // parse incoming request bodies as JSON
app.use(express.static(path.join(__dirname, "../frontend/dist"))); // Serve static assets from the dist folder of the frontend

/// ////////////////////////////
// Auth Routes
/// ////////////////////////////

app.post("/api/auth/register", authControllers.registerUser);
app.post("/api/auth/login", authControllers.loginUser);
app.get("/api/auth/me", authControllers.showMe);
app.delete("/api/auth/logout", authControllers.logoutUser);

/// ////////////////////////////
// User Routes ///////////////
/// ////////////////////////////
// These actions require users to be logged in (authentication)
// Express lets us pass a piece of middleware to run for a specific endpoint
app.get("/api/users", checkAuthentication, userControllers.listUsers);
app.get("/api/users/:id", checkAuthentication, userControllers.showUser);
app.patch("/api/users/:id", checkAuthentication, userControllers.updateUser);

// For challenges
app.get("/api/challenges", challControllers.getAllChallenges);
app.get("/api/challenges/:id", challControllers.getChallengeById);
app.post("/api/challenges", challControllers.createChallenge);
app.post("/api/challenges/:challengeId/posts", postsControllers.createPost);
app.get("/api/challenges/posts", postsControllers.getAllPosts);
app.get(
  "/api/challenges/:challengeId/posts",
  postsControllers.getPostByChallengeId
);
// Get single post by id
app.get("/api/challenges/posts/:id", postsControllers.getPostById);

/// ////////////////////////////
// Participant Routes
/// ////////////////////////////

app.post("/api/participants", participantsControllers.addParticipant);
// app.get('/api/participants', participantsControllers.getAllParticipantsById);
app.get(
  "/api/participants/:id",
  participantsControllers.getChallengeTitlesByUserId
);

/// ////////////////////////////
// Comments Routes
/// ////////////////////////////
app.post("/api/comments", commentsControllers.createComment);
app.get("/api/comments", commentsControllers.getAllComments);
app.get("/api/comments/:id", commentsControllers.getCommentById);
app.get("/api/comments/post/:post_id", commentsControllers.getCommentsByPostId);

/// ////////////////////////////
// Fallback Routes
/// ////////////////////////////
// Requests meant for the API will be sent along to the router.
// For all other requests, send back the index.html file in the dist folder.
app.get("*", (req, res, next) => {
  if (req.originalUrl.startsWith("/api")) return next();
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

app.use(logErrors);

/// ////////////////////////////
// Start Listening
/// ////////////////////////////
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
