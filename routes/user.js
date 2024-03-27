const express = require('express');
const router = express.Router();
const dbMiddleware = require('../db/mongoDB')

router.use(dbMiddleware);

router.get('/', async (req, res) => {
    try {
        const users = await req.collection?.users.find().toArray();
        res.send(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;