export interface MenuItem {
  id: number;
  name: string;
  price: number;
}

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

export interface User {
  id: string;
  email: string;
  name?: string;
}