import { Request, Response } from "express";
import { COFFEE_MENU, getMenuItemById } from "../utils/menu";
import { ApiResponse, MenuItem } from "../types";

// Get all menu items
export const getMenu = async (req: Request, res: Response): Promise<void> => {
  const response: ApiResponse<MenuItem[]> = {
    success: true,
    message: "Menu retrieved successfully",
    data: COFFEE_MENU,
  };

  res.status(200).json(response);
};

// Get specific menu item by ID
export const getMenuItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const itemId = parseInt(id, 10);

  if (isNaN(itemId)) {
    const response: ApiResponse = {
      success: false,
      message: "Invalid menu item ID",
    };
    res.status(400).json(response);
    return;
  }

  const menuItem = getMenuItemById(itemId);

  if (!menuItem) {
    const response: ApiResponse = {
      success: false,
      message: "Menu item not found",
    };
    res.status(404).json(response);
    return;
  }

  const response: ApiResponse<MenuItem> = {
    success: true,
    message: "Menu item retrieved successfully",
    data: menuItem,
  };

  res.status(200).json(response);
};
