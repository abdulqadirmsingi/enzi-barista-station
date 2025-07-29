import { Router } from "express";
import { protect } from "../middleware/auth.middleware";
import {
  getDailySales,
  getUserSales,
  getSalesAnalytics,
  getTopSellingItems,
  getOrderReceipt,
} from "../controllers/sales.controller";

const router = Router();

// All sales routes require authentication
router.use(protect);

// Get daily sales summary (for all orders)
router.get("/daily", getDailySales);

// Get sales for current user only
router.get("/user", getUserSales);

// Get sales analytics
router.get("/analytics", getSalesAnalytics);

// Get top selling items
router.get("/top-items", getTopSellingItems);

// Get receipt for specific order
router.get("/receipt/:orderId", getOrderReceipt);

export default router;
