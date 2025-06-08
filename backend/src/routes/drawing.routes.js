import express from "express";
import { createDrawing, deleteDrawing, getAllUsers, getDrawingsSentFromUser, getDrawingsSentToUser } from "../controllers/drawing.controllers.js";

const router = express.Router();

router.get("/users", getAllUsers);

router.get("/to/:userId", getDrawingsSentToUser);

router.get("/from/:userId", getDrawingsSentFromUser);

router.post("/", createDrawing);

router.delete("/:drawingId", deleteDrawing);

export default router;