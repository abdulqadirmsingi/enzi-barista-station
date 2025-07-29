import { create } from "zustand";
import { OrderItem, MenuItem } from "@/types";
import { toast } from "@/utils/toast";

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
  addItem: (item) =>
    set((state) => {
      const existingItem = state.currentOrder.find(
        (orderItem) => orderItem.id === item.id
      );
      if (existingItem) {
        const newQuantity = existingItem.quantity + 1;

        // Only show toast for significant quantity changes (every 2nd item)
        if (newQuantity % 2 === 0 || newQuantity === 2) {
          toast.success(`${item.name}`, `Quantity: ${newQuantity}`);
        }

        return {
          currentOrder: state.currentOrder.map((orderItem) =>
            orderItem.id === item.id
              ? { ...orderItem, quantity: newQuantity }
              : orderItem
          ),
        };
      } else {
        toast.success(
          `Added ${item.name}`,
          `TZS ${item.price.toLocaleString("en-TZ")}`
        );

        return {
          currentOrder: [...state.currentOrder, { ...item, quantity: 1 }],
        };
      }
    }),
  removeItem: (id) =>
    set((state) => {
      const item = state.currentOrder.find((orderItem) => orderItem.id === id);
      if (item) {
        toast.info(`Removed ${item.name}`);
      }

      return {
        currentOrder: state.currentOrder.filter((item) => item.id !== id),
      };
    }),
  updateQuantity: (id, quantity) =>
    set((state) => {
      const item = state.currentOrder.find((orderItem) => orderItem.id === id);

      if (item) {
        if (quantity <= 0) {
          toast.info(`Removed ${item.name}`);
        } else {
          toast.success(`${item.name}`, `Quantity: ${quantity}`);
        }
      }

      return {
        currentOrder:
          quantity <= 0
            ? state.currentOrder.filter((item) => item.id !== id)
            : state.currentOrder.map((item) =>
                item.id === id ? { ...item, quantity } : item
              ),
      };
    }),
  clearOrder: () =>
    set((state) => {
      if (state.currentOrder.length > 0) {
        toast.info("Order cleared");
      }

      return { currentOrder: [] };
    }),
  getTotal: () => {
    const state = get();
    return state.currentOrder.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  },
}));
