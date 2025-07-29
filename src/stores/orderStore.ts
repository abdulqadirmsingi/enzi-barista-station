import { create } from 'zustand';
import { OrderItem, MenuItem } from '@/types';

interface OrderState {
  currentOrder: OrderItem[];
  addItem: (item: MenuItem) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearOrder: () => void;
  getTotal: () => number;
}

export const useOrderStore = create<OrderState>((set, get) => ({
  currentOrder: [],
  addItem: (item) => set((state) => {
    const existingItem = state.currentOrder.find(orderItem => orderItem.id === item.id);
    if (existingItem) {
      return {
        currentOrder: state.currentOrder.map(orderItem =>
          orderItem.id === item.id 
            ? { ...orderItem, quantity: orderItem.quantity + 1 }
            : orderItem
        )
      };
    } else {
      return {
        currentOrder: [...state.currentOrder, { ...item, quantity: 1 }]
      };
    }
  }),
  removeItem: (id) => set((state) => ({
    currentOrder: state.currentOrder.filter(item => item.id !== id)
  })),
  updateQuantity: (id, quantity) => set((state) => ({
    currentOrder: quantity <= 0 
      ? state.currentOrder.filter(item => item.id !== id)
      : state.currentOrder.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
  })),
  clearOrder: () => set({ currentOrder: [] }),
  getTotal: () => {
    const state = get();
    return state.currentOrder.reduce((total, item) => total + (item.price * item.quantity), 0);
  },
}));