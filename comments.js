// Create web server
const express = require('express');
const router = express.Router();

// Import db
const db = require('../db');

// Import ObjectId
const ObjectId = require('mongodb').ObjectId;

// Import middleware
const auth = require('../middleware/auth');

// Import model
const Comment = require('../models/comment');

// Import validation
const { commentValidation } = require('../validation');

// Create new comment
router.post('/', auth, async (req, res) => {
    // Validate data
    const { error } = commentValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Create new comment
    const comment = new Comment({
        userId: req.user._id,
        postId: req.body.postId,
        content: req.body.content,
        date: new Date()
    });

    try {
        // Save new comment
        const savedComment = await comment.save();
        // Send response
        res.send(savedComment);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Get all comments
router.get('/', async (req, res) => {
    try {
        // Find all comments
        const comments = await Comment.find();
        // Send response
        res.send(comments);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Get comments by post id
router.get('/post/:postId', async (req, res) => {
    try {
        // Find comments by post id
        const comments = await Comment.find({ postId: req.params.postId });
        // Send response
        res.send(comments);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Get comments by user id
router.get('/user/:userId', async (req, res) => {
    try {
        // Find comments by user id
        const comments = await Comment.find({ userId: req.params.userId });
        // Send response
        res.send(comments);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Get comment by id
router.get('/:id', async (req, res) => {
    try {
        // Find comment by id
        const comment = await Comment.findById(req.params.id);
        // Send response
        res.send(comment);
    } catch (err) {
        res.status(