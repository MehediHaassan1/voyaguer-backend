require('dotenv').config()
const cors = require('cors')
const jwt = require('jsonwebtoken');
const express = require('express')
const port = process.env.PORT || 5000

const userRoutes = require('./routes/user');
const app = express()

app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
    res.send('Hello World!')
})

// Use user routes
app.use('/api/v1/users', userRoutes);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})