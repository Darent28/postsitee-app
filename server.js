import express from 'express';
import cors from 'cors';
import usersRoutes from './src/routes/users.routes.js';
import postRoutes from './src/routes/post.routes.js';
import commentRoutes from './src/routes/comment.routes.js';
import reactionRoutes from './src/routes/reaction.routes.js';
import indexRoutes from './src/routes/index.routes.js';
import allowedOrigins from './config/allowedOrigins.js';


const app = express()

const corsOptions = {
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD'],
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    optionsSuccessStatus: 204,
};

app.use(express.static('public'))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use(usersRoutes)
app.use(postRoutes)
app.use(commentRoutes)
app.use(reactionRoutes)
app.use(indexRoutes)


app.listen(5000, () => { console.log("Server started at http://localhost:5000") });

export default app;