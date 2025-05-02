import express from "express";
import { registerAdmin, loginAdmin,getDashboardStats, userDash, logout } from "../controllers/admin.cont.js"
import { verifyAdmin } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.post("/logout", logout);
router.get("/dashboard-stats", getDashboardStats);
router.get("/users", userDash);




export default router;
