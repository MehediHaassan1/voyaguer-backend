const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.send({ data: 'All users get' });
})

module.exports = router;