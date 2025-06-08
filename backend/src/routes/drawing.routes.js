import express from "express";
import { sendDrawing, deleteDrawing, getAllUsers, getDrawingsSentFromUser, getDrawingsSentToUser } from "../controllers/drawing.controllers.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/users", getAllUsers);

router.get("/inbox", protectRoute, getDrawingsSentToUser);

router.get("/sent", protectRoute, getDrawingsSentFromUser);

router.post("/send/:userId", sendDrawing);

router.delete("/delete/:drawingId", protectRoute, deleteDrawing);

export default router;