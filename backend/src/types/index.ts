import { Request } from "express";

// User type (matching Prisma User model)
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

// Extend Express Request to include user
export interface AuthenticatedRequest extends Request {
  user?: User;
}

// Menu item type
export interface MenuItem {
  id: number;
  name: string;
  price: number;
}

// Order item type
export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

// Create order request
export interface CreateOrderRequest {
  items: OrderItem[];
  totalAmount: number;
  itemCount: number;
}

// Auth request types
export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  stack?: string; // For development error details
  errors?: ValidationError[]; // For validation errors
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
  };
  token: string;
}

// Sales summary types
export interface SalesSummary {
  totalOrders: number;
  totalRevenue: number;
  totalItems: number;
  orders: OrderWithDetails[];
}

export interface OrderWithDetails {
  id: string;
  totalAmount: number;
  itemCount: number;
  items: OrderItem[];
  createdAt: Date;
  user: {
    name: string;
    email: string;
  };
}

// Prisma order type for database responses
export interface PrismaOrder {
  id: string;
  totalAmount: number;
  itemCount: number;
  items: unknown; // Prisma Json type
  createdAt: Date;
  user: {
    name: string;
    email: string;
  };
}

// Prisma order with user included (for create operations)
export interface PrismaOrderWithUser {
  id: string;
  totalAmount: number;
  itemCount: number;
  items: unknown; // Prisma Json type
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

// Date filter types
export interface DateFilter {
  startDate?: string;
  endDate?: string;
  shift?: "AM" | "PM";
}

// Validation error type
export interface ValidationError {
  field: string;
  message: string;
}
