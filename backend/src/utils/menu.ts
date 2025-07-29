import { MenuItem } from "../types";

// Static coffee menu as specified in requirements
export const COFFEE_MENU: MenuItem[] = [
  { id: 1, name: "Espresso", price: 2500 },
  { id: 2, name: "Latte", price: 3500 },
  { id: 3, name: "Cappuccino", price: 3000 },
  { id: 4, name: "Mocha", price: 4000 },
];

// Helper function to get menu item by ID
export const getMenuItemById = (id: number): MenuItem | undefined => {
  return COFFEE_MENU.find((item) => item.id === id);
};

// Helper function to validate menu items
export const validateMenuItems = (
  items: { id: number; quantity: number }[]
): boolean => {
  return items.every((item) => {
    const menuItem = getMenuItemById(item.id);
    return menuItem && item.quantity > 0;
  });
};
