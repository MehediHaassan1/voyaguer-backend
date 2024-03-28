require('dotenv').config()
const cors = require('cors')
const jwt = require('jsonwebtoken');
const express = require('express')
const app = express()
const port = process.env.PORT || 5000

const userRoutes = require('./routes/user');
const blogRoutes = require('./routes/blog')
const authUser = require('./auth/authUser')
const jsonwebtoken = require('./auth/jsobwebtoken')


app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
    res.send('Hello World!')
})

// Use user routes
app.use('/api/v1/users', userRoutes);

app.use('/api/v1/blogs', blogRoutes);

app.use('/api/v1/jwt', authUser)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})