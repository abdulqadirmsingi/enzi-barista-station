// User types
export interface User {
  id: string;
  email: string;
  name: string;
}

// Menu types
export interface MenuItem {
  id: number;
  name: string;
  price: number;
}

// Order types
export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  totalAmount: number;
  itemCount: number;
  items: OrderItem[];
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface CreateOrderRequest {
  items: OrderItem[];
  totalAmount: number;
  itemCount: number;
}

export interface OrdersPaginationResponse {
  orders: Order[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalOrders: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

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
  errors?: ValidationError[];
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface RegisterResponse {
  user: User;
}

export interface ValidationError {
  field: string;
  message: string;
}
