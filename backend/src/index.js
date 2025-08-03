import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import {connectDB} from './lib/db.js';

import authRoutes from './routes/auth.routes.js';
import drawingRoutes from './routes/drawing.routes.js'

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// middleware
if(process.env.NODE_ENV !== "production"){
    app.use(cors({
        origin: "http://localhost:5173",
        credentials: true
    }));
};
//Content-Security-Policy: The page’s settings blocked a script (script-src-elem) at https://apis.google.com/js/api.js?onload=__iframefcb5172 from being executed because it violates the following directive: “default-src 'self'” index-Dz-sRWe5.js:1628:1099
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

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(__dirname,"../frontend", "dist", "index.html"));
  });
};

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});