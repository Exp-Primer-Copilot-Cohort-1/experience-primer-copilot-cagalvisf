// Create web server with express
const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto'); // crypto is built in nodejs
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Store comments
const commentsByPostId = {};

// Get comments by post id
app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

// Create comment
app.post('/posts/:id/comments', (req, res) => {
  const commentId = randomBytes(4).toString('hex'); // Generate random id
  const { content } = req.body; // Get content from request body
  const comments = commentsByPostId[req.params.id] || []; // Get comments by post id
  comments.push({ id: commentId, content, status: 'pending' }); // Push new comment to comments
  commentsByPostId[req.params.id] = comments; // Set comments to commentsByPostId
  res.status(201).send(comments); // Send response
});

// Listen port 4001
app.listen(4001, () => {
  console.log('Listening on 4001');
});