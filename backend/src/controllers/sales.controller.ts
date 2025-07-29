import { Response, NextFunction } from "express";
import { z } from "zod";
import { prisma } from "../utils/database";
import { AppError } from "../middleware/error.middleware";
import {
  AuthenticatedRequest,
  ApiResponse,
  SalesStats,
  SalesSummary,
  OrderWithDetails,
  PrismaOrder,
  ReceiptData,
  DateFilter,
  OrderItem,
} from "../types";

// Validation schema for date filters
const dateFilterSchema = z.object({
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  shift: z.enum(["AM", "PM"]).optional(),
});

// Get daily sales summary
export const getDailySales = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Parse and validate query parameters
    const filters = dateFilterSchema.parse(req.query) as DateFilter;

    // Set default to today if no date provided
    const today = new Date();
    const startDate = filters.startDate
      ? new Date(filters.startDate + "T00:00:00.000Z")
      : new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          0,
          0,
          0,
          0
        );
    const endDate = filters.endDate
      ? new Date(filters.endDate + "T23:59:59.999Z")
      : new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          23,
          59,
          59,
          999
        );

    console.log(`[getDailySales] Input filters:`, filters);
    console.log(
      `[getDailySales] Calculated date range: ${startDate.toISOString()} to ${endDate.toISOString()}`
    );

    // Adjust for shift filtering
    let queryStartDate = startDate;
    let queryEndDate = endDate;

    if (filters.shift === "AM") {
      queryStartDate = new Date(startDate);
      queryStartDate.setHours(0, 0, 0, 0);
      queryEndDate = new Date(startDate);
      queryEndDate.setHours(11, 59, 59, 999);
    } else if (filters.shift === "PM") {
      queryStartDate = new Date(startDate);
      queryStartDate.setHours(12, 0, 0, 0);
      queryEndDate = new Date(startDate);
      queryEndDate.setHours(23, 59, 59, 999);
    }

    // Get orders for the specified date range
    const orders = await prisma.order.findMany({
      where: {
        createdAt: {
          gte: queryStartDate,
          lte: queryEndDate,
        },
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Calculate summary statistics
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce(
      (sum: number, order) => sum + order.totalAmount,
      0
    );
    const totalItems = orders.reduce(
      (sum: number, order) => sum + order.itemCount,
      0
    );

    // Format orders for response
    const formattedOrders: OrderWithDetails[] = orders.map((order) => ({
      id: order.id,
      totalAmount: order.totalAmount,
      itemCount: order.itemCount,
      items: order.items as unknown as OrderItem[],
      createdAt: order.createdAt,
      user: {
        name: order.user.name,
        email: order.user.email,
      },
    }));

    // Calculate top selling items for the period
    const itemSales: Map<
      number,
      { name: string; quantity: number; revenue: number }
    > = new Map();

    orders.forEach((order) => {
      const items = order.items as unknown as OrderItem[];
      items.forEach((item: OrderItem) => {
        const existing = itemSales.get(item.id) || {
          name: item.name,
          quantity: 0,
          revenue: 0,
        };
        existing.quantity += item.quantity;
        existing.revenue += item.price * item.quantity;
        itemSales.set(item.id, existing);
      });
    });

    // Convert to array and sort by quantity
    const topItems = Array.from(itemSales.entries())
      .map(([, data]) => data)
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5); // Top 5 items

    // Create stats object to match frontend expectations
    const stats: SalesStats = {
      totalOrders,
      totalRevenue,
      avgOrderValue: totalOrders > 0 ? totalRevenue / totalOrders : 0,
      topItems,
    };

    const response: ApiResponse<{
      stats: SalesStats;
      orders: OrderWithDetails[];
    }> = {
      success: true,
      message: "Sales summary retrieved successfully",
      data: {
        stats,
        orders: formattedOrders,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return next(new AppError(error.errors[0].message, 400));
    }
    next(error);
  }
};

// Get sales for current user only
export const getUserSales = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user!.id;
    const filters = dateFilterSchema.parse(req.query) as DateFilter;

    // Set default to today if no date provided
    const today = new Date();
    const startDate = filters.startDate
      ? new Date(filters.startDate + "T00:00:00.000Z")
      : new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          0,
          0,
          0,
          0
        );
    const endDate = filters.endDate
      ? new Date(filters.endDate + "T23:59:59.999Z")
      : new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          23,
          59,
          59,
          999
        );

    // Adjust for shift filtering
    let queryStartDate = startDate;
    let queryEndDate = endDate;

    if (filters.shift === "AM") {
      queryStartDate = new Date(startDate);
      queryStartDate.setHours(0, 0, 0, 0);
      queryEndDate = new Date(startDate);
      queryEndDate.setHours(11, 59, 59, 999);
    } else if (filters.shift === "PM") {
      queryStartDate = new Date(startDate);
      queryStartDate.setHours(12, 0, 0, 0);
      queryEndDate = new Date(startDate);
      queryEndDate.setHours(23, 59, 59, 999);
    }

    // Get user's orders for the specified date range
    const orders = await prisma.order.findMany({
      where: {
        userId,
        createdAt: {
          gte: queryStartDate,
          lte: queryEndDate,
        },
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Calculate summary statistics
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce(
      (sum: number, order) => sum + order.totalAmount,
      0
    );
    const totalItems = orders.reduce(
      (sum: number, order) => sum + order.itemCount,
      0
    );

    // Format orders for response
    const formattedOrders: OrderWithDetails[] = orders.map((order) => ({
      id: order.id,
      totalAmount: order.totalAmount,
      itemCount: order.itemCount,
      items: order.items as unknown as OrderItem[],
      createdAt: order.createdAt,
      user: {
        name: order.user.name,
        email: order.user.email,
      },
    }));

    // Calculate top selling items for the period
    const itemSales: Map<
      number,
      { name: string; quantity: number; revenue: number }
    > = new Map();

    orders.forEach((order) => {
      const items = order.items as unknown as OrderItem[];
      items.forEach((item: OrderItem) => {
        const existing = itemSales.get(item.id) || {
          name: item.name,
          quantity: 0,
          revenue: 0,
        };
        existing.quantity += item.quantity;
        existing.revenue += item.price * item.quantity;
        itemSales.set(item.id, existing);
      });
    });

    // Convert to array and sort by quantity
    const topItems = Array.from(itemSales.entries())
      .map(([, data]) => data)
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5); // Top 5 items

    // Create stats object to match frontend expectations
    const stats: SalesStats = {
      totalOrders,
      totalRevenue,
      avgOrderValue: totalOrders > 0 ? totalRevenue / totalOrders : 0,
      topItems,
    };

    const response: ApiResponse<{
      stats: SalesStats;
      orders: OrderWithDetails[];
    }> = {
      success: true,
      message: "User sales summary retrieved successfully",
      data: {
        stats,
        orders: formattedOrders,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return next(new AppError(error.errors[0].message, 400));
    }
    next(error);
  }
};

// Get sales analytics (overall statistics)
export const getSalesAnalytics = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const filters = dateFilterSchema.parse(req.query) as DateFilter;

    // Set default to last 30 days if no date provided
    const today = new Date();
    const defaultStartDate = new Date(
      today.getTime() - 30 * 24 * 60 * 60 * 1000
    );
    const startDate = filters.startDate
      ? new Date(filters.startDate + "T00:00:00.000Z")
      : defaultStartDate;
    const endDate = filters.endDate
      ? new Date(filters.endDate + "T23:59:59.999Z")
      : today;

    // Get total orders and revenue
    const [totalStats, dailyStats] = await Promise.all([
      prisma.order.aggregate({
        where: {
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
        _count: {
          id: true,
        },
        _sum: {
          totalAmount: true,
          itemCount: true,
        },
      }),
      prisma.$queryRaw`
        SELECT 
          DATE(created_at) as date,
          COUNT(*) as orders,
          SUM(total_amount) as revenue,
          SUM(item_count) as items
        FROM orders 
        WHERE created_at >= ${startDate} AND created_at <= ${endDate}
        GROUP BY DATE(created_at)
        ORDER BY DATE(created_at) DESC
      `,
    ]);

    const analytics = {
      overview: {
        totalOrders: totalStats._count.id || 0,
        totalRevenue: totalStats._sum.totalAmount || 0,
        totalItems: totalStats._sum.itemCount || 0,
        averageOrderValue: totalStats._count.id
          ? Math.round(
              (totalStats._sum.totalAmount || 0) / totalStats._count.id
            )
          : 0,
      },
      dailyBreakdown: dailyStats,
      dateRange: {
        startDate,
        endDate,
      },
    };

    const response: ApiResponse = {
      success: true,
      message: "Sales analytics retrieved successfully",
      data: analytics,
    };

    res.status(200).json(response);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return next(new AppError(error.errors[0].message, 400));
    }
    next(error);
  }
};

// Get top selling items
export const getTopSellingItems = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const filters = dateFilterSchema.parse(req.query) as DateFilter;
    const limit = parseInt(req.query.limit as string) || 10;

    // Set default to last 30 days if no date provided
    const today = new Date();
    const defaultStartDate = new Date(
      today.getTime() - 30 * 24 * 60 * 60 * 1000
    );
    const startDate = filters.startDate
      ? new Date(filters.startDate + "T00:00:00.000Z")
      : defaultStartDate;
    const endDate = filters.endDate
      ? new Date(filters.endDate + "T23:59:59.999Z")
      : today;

    // Get all orders in the date range
    const orders = await prisma.order.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      select: {
        items: true,
      },
    });

    // Aggregate item sales
    const itemSales: Map<
      number,
      { name: string; quantity: number; revenue: number }
    > = new Map();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    orders.forEach((order: any) => {
      const items = order.items as OrderItem[];
      items.forEach((item: OrderItem) => {
        const existing = itemSales.get(item.id) || {
          name: item.name,
          quantity: 0,
          revenue: 0,
        };
        existing.quantity += item.quantity;
        existing.revenue += item.price * item.quantity;
        itemSales.set(item.id, existing);
      });
    });

    // Convert to array and sort by quantity
    const topItems = Array.from(itemSales.entries())
      .map(([id, data]) => ({ id, ...data }))
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, limit);

    const response: ApiResponse = {
      success: true,
      message: "Top selling items retrieved successfully",
      data: {
        items: topItems,
        dateRange: { startDate, endDate },
      },
    };

    res.status(200).json(response);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return next(new AppError(error.errors[0].message, 400));
    }
    next(error);
  }
};

// Get receipt data for a specific order
export const getOrderReceipt = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { orderId } = req.params;
    const userId = req.user!.id;

    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
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

    // Generate receipt number (format: YYYY-MM-DD-XXXXX)
    const date = new Date(order.createdAt);
    const dateStr = date.toISOString().split("T")[0];
    const timeStr = date.getTime().toString().slice(-5);
    const receiptNumber = `${dateStr}-${timeStr}`;

    const receiptData: ReceiptData = {
      orderId: order.id,
      items: order.items as unknown as OrderItem[],
      totalAmount: order.totalAmount,
      createdAt: order.createdAt.toISOString(),
      barista: {
        name: order.user.name,
        email: order.user.email,
      },
      receiptNumber,
    };

    const response: ApiResponse = {
      success: true,
      message: "Receipt data retrieved successfully",
      data: { receipt: receiptData },
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
