import { Router } from "express";
import { getMenu, getMenuItem } from "../controllers/menu.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

// All menu routes require authentication
router.use(protect);

// Get all menu items
router.get("/", getMenu);

// Get specific menu item
router.get("/:id", getMenuItem);

export default router;
