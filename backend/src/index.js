import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {connectDB} from './lib/db.js';

import authRoutes from './routes/auth.routes.js';
import drawingRoutes from './routes/drawing.routes.js'

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5001;

// middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/drawing", drawingRoutes);

app.get("/", (req, res) => {
    res.send("test");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});