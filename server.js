import express from 'express';
import cors from 'cors';
import usersRoutes from './src/routes/users.routes.js';
import postRoutes from './src/routes/post.routes.js';
import indexRoutes from './src/routes/index.routes.js';
import allowedOrigins from './config/allowedOrigins.js';

const app = express()

const corsOptions = {
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(corsOptions))

app.use(usersRoutes)
app.use(postRoutes)
app.use(indexRoutes)


app.listen(5000, () => { console.log("Server started at http://localhost:5000") });

export default app;