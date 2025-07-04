import express from "express";
import { sendDrawing, deleteDrawing, getAllUsers, getDrawingsSentFromUser, getDrawingsSentToUser, searchUsers } from "../controllers/drawing.controllers.js";
import { protectRoute, sendAuthUser } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/users", getAllUsers);
router.get("/users/:search", searchUsers);

router.get("/inbox", protectRoute, getDrawingsSentToUser);

router.get("/sent", protectRoute, getDrawingsSentFromUser);

router.post("/send/:userId", sendAuthUser, sendDrawing);

router.delete("/delete/:drawingId", protectRoute, deleteDrawing);

export default router;