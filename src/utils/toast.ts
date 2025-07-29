import { toast as baseToast } from "@/hooks/use-toast";
import { User, MenuItem as ImportedMenuItem, OrderItem } from "@/types";

// Types for better type safety
interface SalesFilters {
  startDate?: string;
  endDate?: string;
  category?: string;
}

interface Order {
  items: OrderItem[];
  total: number;
}

// Enhanced toast utilities with console logging and better UX
export const toast = {
  success: (message: string, description?: string) => {
    console.log(
      `✅ SUCCESS: ${message}`,
      description ? `- ${description}` : ""
    );
    return baseToast({
      title: message,
      description,
      variant: "default", // Using default since success variant needs to be added to type
      duration: 3000,
    });
  },

  error: (message: string, description?: string) => {
    console.error(
      `❌ ERROR: ${message}`,
      description ? `- ${description}` : ""
    );
    return baseToast({
      title: message,
      description,
      variant: "destructive",
      duration: 5000,
    });
  },

  warning: (message: string, description?: string) => {
    console.warn(
      `⚠️ WARNING: ${message}`,
      description ? `- ${description}` : ""
    );
    return baseToast({
      title: message,
      description,
      variant: "default", // Using default since warning variant needs to be added to type
      duration: 4000,
    });
  },

  info: (message: string, description?: string) => {
    console.info(`ℹ️ INFO: ${message}`, description ? `- ${description}` : "");
    return baseToast({
      title: message,
      description,
      variant: "default",
      duration: 3000,
    });
  },

  loading: (message: string, description?: string) => {
    console.log(
      `⏳ LOADING: ${message}`,
      description ? `- ${description}` : ""
    );
    return baseToast({
      title: message,
      description,
      variant: "default",
      duration: 2000,
    });
  },
};

// Console logging utilities for actions
export const logAction = {
  auth: {
    login: (email: string) => {
      console.log(`🔐 User login attempt:`, {
        email,
        timestamp: new Date().toISOString(),
      });
    },
    loginSuccess: (user: User) => {
      console.log(`✅ User logged in successfully:`, {
        id: user.id,
        email: user.email,
        name: user.name,
        timestamp: new Date().toISOString(),
      });
    },
    loginError: (error: string) => {
      console.error(`❌ Login failed:`, {
        error,
        timestamp: new Date().toISOString(),
      });
    },
    register: (email: string, name: string) => {
      console.log(`📝 User registration attempt:`, {
        email,
        name,
        timestamp: new Date().toISOString(),
      });
    },
    registerSuccess: (user: User) => {
      console.log(`✅ User registered successfully:`, {
        id: user.id,
        email: user.email,
        name: user.name,
        timestamp: new Date().toISOString(),
      });
    },
    registerError: (error: string) => {
      console.error(`❌ Registration failed:`, {
        error,
        timestamp: new Date().toISOString(),
      });
    },
    logout: () => {
      console.log(`👋 User logged out:`, {
        timestamp: new Date().toISOString(),
      });
    },
  },

  pos: {
    addItem: (item: ImportedMenuItem | OrderItem, quantity: number) => {
      console.log(`🛒 Item added to order:`, {
        item: item.name,
        quantity,
        price: item.price,
        timestamp: new Date().toISOString(),
      });
    },
    removeItem: (item: ImportedMenuItem | OrderItem) => {
      console.log(`🗑️ Item removed from order:`, {
        item: item.name,
        timestamp: new Date().toISOString(),
      });
    },
    updateQuantity: (
      item: ImportedMenuItem | OrderItem,
      oldQuantity: number,
      newQuantity: number
    ) => {
      console.log(`📝 Item quantity updated:`, {
        item: item.name,
        oldQuantity,
        newQuantity,
        timestamp: new Date().toISOString(),
      });
    },
    clearOrder: () => {
      console.log(`🧹 Order cleared:`, { timestamp: new Date().toISOString() });
    },
    checkout: (order: Order) => {
      console.log(`💰 Order checkout initiated:`, {
        total: order.total,
        itemsCount: order.items.length,
        timestamp: new Date().toISOString(),
      });
    },
    checkoutSuccess: (orderId: string, total: number) => {
      console.log(`✅ Order completed successfully:`, {
        orderId,
        total,
        timestamp: new Date().toISOString(),
      });
    },
    checkoutError: (error: string) => {
      console.error(`❌ Order checkout failed:`, {
        error,
        timestamp: new Date().toISOString(),
      });
    },
  },

  menu: {
    load: () => {
      console.log(`📋 Loading menu items:`, {
        timestamp: new Date().toISOString(),
      });
    },
    loadSuccess: (itemsCount: number) => {
      console.log(`✅ Menu loaded successfully:`, {
        itemsCount,
        timestamp: new Date().toISOString(),
      });
    },
    loadError: (error: string) => {
      console.error(`❌ Menu loading failed:`, {
        error,
        timestamp: new Date().toISOString(),
      });
    },
  },

  sales: {
    load: (filters?: SalesFilters) => {
      console.log(`📊 Loading sales data:`, {
        filters,
        timestamp: new Date().toISOString(),
      });
    },
    loadSuccess: (salesCount: number, total?: number) => {
      console.log(`✅ Sales data loaded successfully:`, {
        salesCount,
        total,
        timestamp: new Date().toISOString(),
      });
    },
    loadError: (error: string) => {
      console.error(`❌ Sales data loading failed:`, {
        error,
        timestamp: new Date().toISOString(),
      });
    },
  },

  api: {
    request: (method: string, url: string, data?: unknown) => {
      console.log(`🌐 API Request:`, {
        method,
        url,
        hasData: !!data,
        timestamp: new Date().toISOString(),
      });
    },
    response: (method: string, url: string, status: number, data?: unknown) => {
      const emoji = status >= 200 && status < 300 ? "✅" : "❌";
      console.log(`${emoji} API Response:`, {
        method,
        url,
        status,
        hasData: !!data,
        timestamp: new Date().toISOString(),
      });
    },
    error: (method: string, url: string, error: Error | string) => {
      console.error(`❌ API Error:`, {
        method,
        url,
        error: typeof error === "string" ? error : error.message,
        timestamp: new Date().toISOString(),
      });
    },
  },
};
