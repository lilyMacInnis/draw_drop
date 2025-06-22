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
if(true){
    app.use(cors({
        origin: "http://localhost:5173",
        credentials: true
    }));
}
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline';"
  );
  next();
});

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/draw", drawingRoutes);

app.get("/", (req, res) => {
    res.send("test");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});