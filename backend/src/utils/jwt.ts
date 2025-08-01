import jwt, { SignOptions } from "jsonwebtoken";
import { Response } from "express";

const JWT_SECRET: string = process.env.JWT_SECRET || "fallback-secret-key";
const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN || "7d";

export interface JwtPayload {
  userId: string;
  email: string;
}

// Generate JWT token
export const generateToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
};

// Verify JWT token
export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
};

// Set JWT token as HTTP-only cookie
export const setTokenCookie = (res: Response, token: string): void => {
  // Check if we're in production environment
  const isProduction = process.env.NODE_ENV === "production";

  // Get the frontend URL for cross-origin checks
  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:8080";
  const isHttps = frontendUrl.startsWith("https://");

  // In production, we need different settings based on deployment setup
  const cookieSettings = {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    path: "/",
    // For production with HTTPS, use secure cookies
    secure: isProduction && isHttps,
    // For cross-origin requests in production, use 'none'
    // For same-origin or localhost, use 'lax'
    sameSite: isProduction && isHttps ? ("none" as const) : ("lax" as const),
  };

  res.cookie("auth-token", token, cookieSettings);
};

// Clear JWT token cookie
export const clearTokenCookie = (res: Response): void => {
  const isProduction = process.env.NODE_ENV === "production";
  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:8080";
  const isHttps = frontendUrl.startsWith("https://");

  res.clearCookie("auth-token", {
    httpOnly: true,
    secure: isProduction && isHttps,
    sameSite: isProduction && isHttps ? ("none" as const) : ("lax" as const),
    path: "/",
  });
};
