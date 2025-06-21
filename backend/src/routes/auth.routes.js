import express from 'express';
import { signup, login, logout, checkAuth, updateProfilePic, updateUserName } from '../controllers/auth.controllers.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.get("/check", protectRoute, checkAuth);

router.put("/update-profile-pic", protectRoute, updateProfilePic);
router.put("/update-user-name", protectRoute, updateUserName);


export default router;