const express = require('express');
const router = express.Router();
const dbMiddleware = require('../db/mongoDB')

router.use(dbMiddleware);


router.get('/', async (req, res) => {
    try {
        const blogs = await req.collection.blogs.find().toArray();
        res.send(blogs);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;