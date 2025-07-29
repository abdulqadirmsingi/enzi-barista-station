import { Router } from "express";
import { protect } from "../middleware/auth.middleware";
import {
  createOrder,
  getUserOrders,
  getOrderById,
} from "../controllers/order.controller";

const router = Router();

// All order routes require authentication
router.use(protect);

// Create a new order
router.post("/", createOrder);

// Get user's orders
router.get("/", getUserOrders);

// Get specific order by ID
router.get("/:id", getOrderById);

export default router;
