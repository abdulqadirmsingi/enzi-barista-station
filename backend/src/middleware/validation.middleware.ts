import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";
import { ApiResponse } from "../types";

// Schema for user registration
export const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    email: z.string().email("Please provide a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
  }),
});

// Schema for user login
export const loginSchema = z.object({
  body: z.object({
    email: z.string().email("Please provide a valid email"),
    password: z.string().min(1, "Password is required"),
  }),
});

// Schema for creating an order
export const createOrderSchema = z.object({
  body: z.object({
    items: z.array(
      z.object({
        id: z.number(),
        name: z.string(),
        price: z.number().int().positive(),
        quantity: z.number().int().positive("Quantity must be at least 1"),
      })
    ),
    totalAmount: z
      .number()
      .int()
      .positive("Total amount must be a positive number"),
    itemCount: z
      .number()
      .int()
      .positive("Item count must be a positive number"),
  }),
});

// Schema for date filter
export const dateFilterSchema = z.object({
  query: z.object({
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    shift: z.enum(["AM", "PM"]).optional(),
  }),
});

// Generic validation middleware
export const validate = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const errorMessages = err.errors.map((error) => ({
          field: error.path.join("."),
          message: error.message,
        }));

        const response: ApiResponse = {
          success: false,
          message: "Validation failed",
          errors: errorMessages,
        };

        res.status(400).json(response);
        return;
      }
      next(err);
    }
  };
};
