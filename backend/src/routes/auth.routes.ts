import { Router } from "express";
import {
  register,
  login,
  logout,
  getCurrentUser,
  checkAuth,
} from "../controllers/auth.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected routes
router.use(protect); // All routes after this middleware require authentication

router.post("/logout", logout);
router.get("/me", getCurrentUser);
router.get("/check", checkAuth);

export default router;
