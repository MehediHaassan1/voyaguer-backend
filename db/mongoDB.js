require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const client = new MongoClient(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
})

const connectDB = async () => {
    try {
        await client.connect()
        console.log('MongoDB connected successfully');
        return client.db(process.env.DB_NAME);
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit process with failure
    }
}

const dbMiddleware = async (req, res, next) => {
    try {
        const db = await connectDB();
        req.db = db;
        req.collection = {
            users: db.collection('users'),
            posts: db.collection('posts'),
            comments: db.collection('comments'),
        }                                                                                           
        // req.collection = db.collection('users')
        next();
    } catch (error) {
        console.error('Error connecting to database:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = dbMiddleware;