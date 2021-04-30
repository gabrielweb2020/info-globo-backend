const express = require('express');
const authMiddleware = require('../middlewares/auth');

const Post = require('../models/Post');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().populate('user');

        return res.send({ posts });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading posts!' });
    }
});

router.get('/:postId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId).populate('user');

        return res.send({ post });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading post!' });
    }
});

router.post('/', async (req, res) => {
    try {
        const post = await Post.create({ ...req.body, user: req.userId });

        return res.send({ post });
    } catch (err) {
        return res.status(400).send({ error: 'Error creating new post!' });
    }
});

router.put('/:postId', async (req, res) => {
    try {
        const { title, description } = req.body;

        const post = await Post.findByIdAndUpdate(req.params.postId, { 
            title, 
            description 
        }, { new: true });

        await post.save();

        return res.send({ post });
    } catch (err) {
        return res.status(400).send({ error: 'Error updating post!' });
    }
});

router.delete('/:postId', async (req, res) => {
    try {
        await Post.findByIdAndRemove(req.params.postId);

        return res.send();
    } catch (err) {
        return res.status(400).send({ error: 'Error deleting post!' });
    }
});

module.exports = app => app.use('/posts', router);