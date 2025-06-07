import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './lib/db.js'

import authRoutes from './routes/auth.routes.js';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5001;

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("test");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});