import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../types";

export class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  err: Error & {
    statusCode?: number;
    status?: string;
    isOperational?: boolean;
    errmsg?: string;
    errors?: Record<string, { message: string }>;
    code?: number;
  },
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  const response: ApiResponse = {
    success: false,
    message: err.message || "Something went wrong!",
  };

  // Log error in development
  if (process.env.NODE_ENV === "development") {
    console.error("Error 💥", err);
    response.stack = err.stack;
  }

  // Handle JWT errors
  if (err.name === "JsonWebTokenError") {
    err.message = "Invalid token. Please log in again!";
    err.statusCode = 401;
  }

  if (err.name === "TokenExpiredError") {
    err.message = "Your token has expired! Please log in again.";
    err.statusCode = 401;
  }

  // Handle validation errors
  if (err.name === "ValidationError" && err.errors) {
    const errors = Object.values(err.errors).map((el) => el.message);
    err.message = `Invalid input data: ${errors.join(". ")}`;
    err.statusCode = 400;
  }

  // Handle duplicate fields
  if (err.code === 11000 && err.errmsg) {
    const match = err.errmsg.match(/(["'])(\\?.)*?\1/);
    const value = match ? match[0] : "unknown";
    err.message = `Duplicate field value: ${value}. Please use another value!`;
    err.statusCode = 400;
  }

  res.status(err.statusCode).json({
    ...response,
    message: err.isOperational ? err.message : "Something went very wrong!",
  });
};

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = new AppError(
    `Can't find ${req.originalUrl} on this server!`,
    404
  );
  next(error);
};
