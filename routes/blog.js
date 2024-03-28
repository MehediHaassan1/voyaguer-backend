const express = require('express');
const router = express.Router();
const dbMiddleware = require('../db/mongoDB')
const jsonwebtoken = require('../auth/jsobwebtoken');
const { ObjectId } = require('mongodb');

router.use(dbMiddleware);


router.get('/', async (req, res) => {
    try {
        const blogs = await req.collection.blogs.find().toArray();
        res.send(blogs);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/:blogId', jsonwebtoken, async (req, res) => {
    try {
        const id = req.params.blogId;
        console.log(id)
        if (!id) {
            return res.status(400).send({ error: 'Invalid blog post' })
        }

        const blog = await req.collection.blogs.findOne({ _id: new ObjectId(id) });
        console.log(blog);
        if (!blog) {
            return res.status(404).json({ error: 'Blog post not found' });
        }
        res.send(blog);
    }
    catch {
        res.status(500).send({ error: 'Internal server error' });
    }
})

module.exports = router;