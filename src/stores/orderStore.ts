import { create } from "zustand";
import { OrderItem, MenuItem } from "@/types";
import { toast, logAction } from "@/utils/toast";

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

        // Log the action
        logAction.pos.updateQuantity(item, existingItem.quantity, newQuantity);
        toast.success(
          `Added ${item.name}`,
          `Quantity updated to ${newQuantity}`
        );

        return {
          currentOrder: state.currentOrder.map((orderItem) =>
            orderItem.id === item.id
              ? { ...orderItem, quantity: newQuantity }
              : orderItem
          ),
        };
      } else {
        // Log the action
        logAction.pos.addItem(item, 1);
        toast.success(
          `Added ${item.name}`,
          `Added to your order for $${item.price.toFixed(2)}`
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
        // Log the action
        logAction.pos.removeItem(item);
        toast.info(`Removed ${item.name}`, "Item removed from your order");
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
          // Log removal
          logAction.pos.removeItem(item);
          toast.info(`Removed ${item.name}`, "Item removed from your order");
        } else {
          // Log quantity update
          logAction.pos.updateQuantity(item, item.quantity, quantity);
          toast.success(
            `Updated ${item.name}`,
            `Quantity changed to ${quantity}`
          );
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
        // Log the action
        logAction.pos.clearOrder();
        toast.info("Order cleared", "All items removed from your order");
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
