import {
  ApiResponse,
  AuthResponse,
  RegisterRequest,
  LoginRequest,
  User,
  CreateOrderRequest,
  Order,
  OrdersPaginationResponse,
  SalesStats,
  ReceiptData,
} from "@/types";


const API_BASE_URL = "http://localhost:5000/api";

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;
    const method = options.method || "GET";

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      credentials: "include", // Include cookies for authentication
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await response.json();
        const error = new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );

        throw error;
      }

      const data = await response.json();

      return data;
    } catch (error) {
      // Log the error if it's not already logged
      if (error instanceof Error && !error.message.includes("HTTP error!")) {
        console.error('API Error:', { method, endpoint, error: error.message });
      }
      throw error;
    }
  }

  // Auth endpoints
  async register(data: RegisterRequest): Promise<ApiResponse<AuthResponse>> {
    return this.request<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async login(data: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    return this.request<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async logout(): Promise<ApiResponse> {
    return this.request("/auth/logout", {
      method: "POST",
    });
  }

  async getCurrentUser(): Promise<ApiResponse<{ user: User }>> {
    return this.request<{ user: User }>("/auth/me");
  }

  async checkAuth(): Promise<
    ApiResponse<{ isAuthenticated: boolean; user: User }>
  > {
    return this.request<{ isAuthenticated: boolean; user: User }>(
      "/auth/check"
    );
  }

  // Order endpoints
  async createOrder(
    data: CreateOrderRequest
  ): Promise<ApiResponse<{ order: Order }>> {
    return this.request<{ order: Order }>("/orders", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getUserOrders(
    page = 1,
    limit = 10
  ): Promise<ApiResponse<OrdersPaginationResponse>> {
    return this.request<OrdersPaginationResponse>(
      `/orders?page=${page}&limit=${limit}`
    );
  }

  async getOrderById(orderId: string): Promise<ApiResponse<{ order: Order }>> {
    return this.request<{ order: Order }>(`/orders/${orderId}`);
  }

  // Sales endpoints
  async getSalesStats(filters?: {
    startDate?: string;
    endDate?: string;
    shift?: "AM" | "PM";
  }): Promise<ApiResponse<{ stats: SalesStats; orders: Order[] }>> {
    const params = new URLSearchParams();
    if (filters?.startDate) params.append("startDate", filters.startDate);
    if (filters?.endDate) params.append("endDate", filters.endDate);
    if (filters?.shift) params.append("shift", filters.shift);

    const queryString = params.toString();
    const endpoint = queryString
      ? `/sales/daily?${queryString}`
      : "/sales/daily";

    return this.request<{ stats: SalesStats; orders: Order[] }>(endpoint);
  }

  async getTodaysSales(): Promise<
    ApiResponse<{
      summary: {
        totalOrders: number;
        totalRevenue: number;
        totalItems: number;
      };
      orders: Order[];
    }>
  > {
    const today = new Date().toISOString().split("T")[0];
    const response = await this.getSalesStats({
      startDate: today,
      endDate: today,
    });

    if (response.success && response.data) {
      const { stats, orders } = response.data;
      const totalItems = orders.reduce(
        (sum, order) => sum + order.itemCount,
        0
      );

      return {
        ...response,
        data: {
          summary: {
            totalOrders: stats.totalOrders,
            totalRevenue: stats.totalRevenue,
            totalItems,
          },
          orders,
        },
      };
    }

    return {
      success: false,
      message: "Failed to fetch today's sales",
      data: {
        summary: { totalOrders: 0, totalRevenue: 0, totalItems: 0 },
        orders: [],
      },
    };
  }

  async getOrderReceipt(
    orderId: string
  ): Promise<ApiResponse<{ receipt: ReceiptData }>> {
    return this.request<{ receipt: ReceiptData }>(`/sales/receipt/${orderId}`);
  }
}

export const apiService = new ApiService();
