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

// Order with user relation type (for Prisma responses)
export interface PrismaOrderWithUser {
  id: string;
  userId: string;
  totalAmount: number;
  itemCount: number;
  items: unknown; // JSON field
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

// Sales statistics type
export interface SalesStats {
  totalOrders: number;
  totalRevenue: number;
  avgOrderValue: number;
  topItems: {
    name: string;
    quantity: number;
    revenue: number;
  }[];
}

// Receipt data type
export interface ReceiptData {
  orderId: string;
  items: OrderItem[];
  totalAmount: number;
  createdAt: string;
  barista: {
    name: string;
    email: string;
  };
  receiptNumber: string;
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

export interface ValidationError {
  field: string;
  message: string;
}

// Date filter types
export interface DateFilter {
  startDate?: string;
  endDate?: string;
  shift?: "AM" | "PM";
}

// Additional order types for sales functionality
export interface PrismaOrder {
  id: string;
  userId: string;
  totalAmount: number;
  itemCount: number;
  items: unknown;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: string;
    name: string;
    email: string;
  };
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

export interface SalesSummary {
  totalOrders: number;
  totalRevenue: number;
  totalItems: number;
  orders: OrderWithDetails[];
}
