import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "../utils/database";
import { generateToken, setTokenCookie, clearTokenCookie } from "../utils/jwt";
import { AppError } from "../middleware/error.middleware";
import {
  AuthenticatedRequest,
  RegisterRequest,
  LoginRequest,
  ApiResponse,
  AuthResponse,
} from "../types";

// Validation schemas
const registerSchema = z.object({
  email: z.string().email("Please provide a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
});

const loginSchema = z.object({
  email: z.string().email("Please provide a valid email"),
  password: z.string().min(1, "Password is required"),
});

// Register new user
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Validate request body
    const validatedData = registerSchema.parse(req.body) as RegisterRequest;
    const { email, password, name } = validatedData;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return next(new AppError("User with this email already exists", 400));
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      email: user.email,
    });

    // Set cookie
    setTokenCookie(res, token);

    // Send response
    const response: ApiResponse<AuthResponse> = {
      success: true,
      message: "User registered successfully",
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        token,
      },
    };

    res.status(201).json(response);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return next(new AppError(error.errors[0].message, 400));
    }
    next(error);
  }
};

// Login user
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Validate request body
    const validatedData = loginSchema.parse(req.body) as LoginRequest;
    const { email, password } = validatedData;

    // Find user and include password for comparison
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return next(new AppError("Invalid email or password", 401));
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return next(new AppError("Invalid email or password", 401));
    }

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      email: user.email,
    });

    // Set cookie
    setTokenCookie(res, token);

    // Send response
    const response: ApiResponse<AuthResponse> = {
      success: true,
      message: "Login successful",
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        token,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return next(new AppError(error.errors[0].message, 400));
    }
    next(error);
  }
};

// Logout user
export const logout = async (req: Request, res: Response): Promise<void> => {
  // Clear the cookie
  clearTokenCookie(res);

  const response: ApiResponse = {
    success: true,
    message: "Logout successful",
  };

  res.status(200).json(response);
};

// Get current user
export const getCurrentUser = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const response: ApiResponse = {
    success: true,
    message: "User retrieved successfully",
    data: {
      user: {
        id: req.user!.id,
        email: req.user!.email,
        name: req.user!.name,
      },
    },
  };

  res.status(200).json(response);
};

// Check if user is authenticated (for frontend to verify auth status)
export const checkAuth = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const response: ApiResponse = {
    success: true,
    message: "User is authenticated",
    data: {
      isAuthenticated: true,
      user: {
        id: req.user!.id,
        email: req.user!.email,
        name: req.user!.name,
      },
    },
  };

  res.status(200).json(response);
};
