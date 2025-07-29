import {
  ApiResponse,
  AuthResponse,
  RegisterRequest,
  LoginRequest,
  User,
} from "@/types";
import { logAction } from "@/utils/toast";

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
      // Log the request
      logAction.api.request(method, endpoint, options.body);

      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await response.json();
        const error = new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );

        // Log the error response
        logAction.api.response(method, endpoint, response.status, errorData);
        logAction.api.error(method, endpoint, error);

        throw error;
      }

      const data = await response.json();

      // Log successful response
      logAction.api.response(method, endpoint, response.status, data);

      return data;
    } catch (error) {
      // Log the error if it's not already logged
      if (error instanceof Error && !error.message.includes("HTTP error!")) {
        logAction.api.error(method, endpoint, error);
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
}

export const apiService = new ApiService();
