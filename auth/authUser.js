require('dotenv').config()
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();


router.post('/', async (req, res) => {
    const email = req.body.email;
    const token = jwt.sign({ email }, process.env.SECRET_KEY);
    res.send({ token });
});

module.exports = router;
