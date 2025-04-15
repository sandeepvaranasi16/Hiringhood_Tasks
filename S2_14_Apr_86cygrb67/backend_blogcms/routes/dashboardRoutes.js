import express from "express";
import {
  getDashboardStats,
  getRecentPosts,
} from "../controllers/dashboardController.js";
import { authenticate, authorizeAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/stats", authenticate, getDashboardStats);
router.get("/recent-posts", authenticate, getRecentPosts);

export default router;
