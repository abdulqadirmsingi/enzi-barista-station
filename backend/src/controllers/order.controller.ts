import { Response, NextFunction } from "express";
import { z } from "zod";
import { prisma } from "../utils/database";
import { validateMenuItems, getMenuItemById } from "../utils/menu";
import { AppError } from "../middleware/error.middleware";
import {
  AuthenticatedRequest,
  CreateOrderRequest,
  OrderItem,
  ApiResponse,
  PrismaOrderWithUser,
} from "../types";

// Validation schema for creating orders
const createOrderSchema = z.object({
  items: z
    .array(
      z.object({
        id: z.number().positive("Menu item ID must be positive"),
        name: z.string().min(1, "Item name is required"),
        price: z.number().positive("Price must be positive"),
        quantity: z.number().positive("Quantity must be positive"),
      })
    )
    .min(1, "At least one item is required"),
  totalAmount: z.number().positive("Total amount must be positive"),
  itemCount: z.number().positive("Item count must be positive"),
});

// Create a new order
export const createOrder = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Validate request body
    const validatedData = createOrderSchema.parse(
      req.body
    ) as CreateOrderRequest;
    const { items, totalAmount, itemCount } = validatedData;

    // Validate that all items exist in the menu
    const menuValidation = validateMenuItems(
      items.map((item) => ({ id: item.id, quantity: item.quantity }))
    );
    if (!menuValidation) {
      return next(
        new AppError("One or more items are invalid or not available", 400)
      );
    }

    // Verify pricing integrity
    let calculatedTotal = 0;
    let calculatedItemCount = 0;

    for (const item of items) {
      const menuItem = getMenuItemById(item.id);
      if (!menuItem) {
        return next(
          new AppError(`Menu item with ID ${item.id} not found`, 400)
        );
      }

      // Verify that the item details match the menu
      if (menuItem.name !== item.name || menuItem.price !== item.price) {
        return next(
          new AppError(
            `Item details do not match menu for item: ${item.name}`,
            400
          )
        );
      }

      calculatedTotal += item.price * item.quantity;
      calculatedItemCount += item.quantity;
    }

    // Verify totals
    if (calculatedTotal !== totalAmount) {
      return next(
        new AppError("Total amount does not match calculated total", 400)
      );
    }

    if (calculatedItemCount !== itemCount) {
      return next(
        new AppError("Item count does not match calculated count", 400)
      );
    }

    // Create the order
    const order = (await prisma.order.create({
      data: {
        userId: req.user!.id,
        totalAmount,
        itemCount,
        items: JSON.parse(JSON.stringify(items)), // Convert to proper JSON format for Prisma
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })) as PrismaOrderWithUser;

    const response: ApiResponse = {
      success: true,
      message: "Order created successfully",
      data: {
        order: {
          id: order.id,
          totalAmount: order.totalAmount,
          itemCount: order.itemCount,
          items: order.items as OrderItem[],
          createdAt: order.createdAt,
          user: order.user,
        },
      },
    };

    res.status(201).json(response);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return next(new AppError(error.errors[0].message, 400));
    }
    next(error);
  }
};

// Get user's orders
export const getUserOrders = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user!.id;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    // Get orders with pagination
    const [orders, totalOrders] = await Promise.all([
      prisma.order.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      }),
      prisma.order.count({
        where: { userId },
      }),
    ]);

    const response: ApiResponse = {
      success: true,
      message: "Orders retrieved successfully",
      data: {
        orders,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalOrders / limit),
          totalOrders,
          hasNextPage: page < Math.ceil(totalOrders / limit),
          hasPrevPage: page > 1,
        },
      },
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

// Get specific order by ID
export const getOrderById = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;

    const order = await prisma.order.findFirst({
      where: {
        id,
        userId, // Ensure user can only access their own orders
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!order) {
      return next(new AppError("Order not found", 404));
    }

    const response: ApiResponse = {
      success: true,
      message: "Order retrieved successfully",
      data: { order },
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
