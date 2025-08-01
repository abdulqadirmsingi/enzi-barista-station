import { z } from "zod";

// Login validation schema
export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// Register validation schema
export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type RegisterFormData = z.infer<typeof registerSchema>;

// Order validation schema
export const orderItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number().positive("Price must be positive"),
  quantity: z.number().int().positive("Quantity must be a positive integer"),
});

export const createOrderSchema = z.object({
  items: z
    .array(orderItemSchema)
    .min(1, "Order must contain at least one item"),
  totalAmount: z.number().positive("Total amount must be positive"),
  itemCount: z.number().int().positive("Item count must be positive"),
});

export type OrderItemFormData = z.infer<typeof orderItemSchema>;
export type CreateOrderFormData = z.infer<typeof createOrderSchema>;

// Menu item validation schema
export const menuItemSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Menu item name is required"),
  price: z.number().positive("Price must be positive"),
  category: z.string().optional(),
  description: z.string().optional(),
});

export type MenuItemFormData = z.infer<typeof menuItemSchema>;

// Validation helper functions
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (
  password: string
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (password.length < 6) {
    errors.push("Password must be at least 6 characters long");
  }

  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }

  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  }

  if (!/\d/.test(password)) {
    errors.push("Password must contain at least one number");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validatePhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s\-()]{10,}$/;
  return phoneRegex.test(phone);
};

// Price formatting and validation
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("sw-TZ", {
    style: "currency",
    currency: "TZS",
  }).format(price);
};

export const parsePrice = (priceString: string): number | null => {
  const cleaned = priceString.replace(/[^\d.-]/g, "");
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? null : parsed;
};
