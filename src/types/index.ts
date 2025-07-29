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
  items: OrderItem[];
  total: number;
  timestamp: string;
  barista_id: string;
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

export interface ValidationError {
  field: string;
  message: string;
}
