import { create } from "zustand";
import { User, RegisterRequest, LoginRequest } from "@/types";
import { apiService } from "@/services/api";
import { toast } from "@/utils/toast";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  setUser: (user: User | null) => void;
  register: (
    data: RegisterRequest
  ) => Promise<{ success: boolean; error?: string }>;
  login: (data: LoginRequest) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
      error: null,
    }),

  register: async (data: RegisterRequest) => {
    set({ isLoading: true, error: null });

    toast.loading(
      "Creating your account...",
      "Please wait while we set up your profile"
    );

    try {
      const response = await apiService.register(data);

      if (response.success && response.data) {
        const user = response.data.user;

        // Don't auto-login on registration
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });

        toast.success(
          "Account created successfully!",
          `Welcome, ${user.name}! Please log in to start using the POS system.`
        );

        return { success: true };
      } else {
        const errorMessage = response.message || "Registration failed";
        set({ isLoading: false, error: errorMessage });

        toast.error("Registration failed", errorMessage);

        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Registration failed";
      set({ isLoading: false, error: errorMessage });

      toast.error(
        "Registration failed",
        "Please check your information and try again"
      );

      return { success: false, error: errorMessage };
    }
  },

  login: async (data: LoginRequest) => {
    set({ isLoading: true, error: null });

    toast.loading("Signing you in...", "Verifying your credentials");

    try {
      const response = await apiService.login(data);

      if (response.success && response.data) {
        const user = response.data.user;

        set({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });

        toast.success(
          "Welcome back!",
          `Successfully signed in as ${user.name}`
        );

        return { success: true };
      } else {
        const errorMessage = response.message || "Login failed";
        set({ isLoading: false, error: errorMessage });

        toast.error("Sign in failed", errorMessage);

        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Login failed";
      set({ isLoading: false, error: errorMessage });

      toast.error("Sign in failed", "Please check your email and password");

      return { success: false, error: errorMessage };
    }
  },

  logout: async () => {
    set({ isLoading: true });

    // Show loading toast
    toast.loading("Signing you out...", "Please wait");

    try {
      await apiService.logout();

      toast.success(
        "Signed out successfully",
        "You have been safely logged out"
      );
    } catch (error) {
      console.error("Logout error:", error);
      toast.warning("Logout completed", "You have been signed out locally");
    } finally {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    }
  },

  checkAuth: async () => {
    set({ isLoading: true });

    try {
      const response = await apiService.checkAuth();

      if (response.success && response.data?.isAuthenticated) {
        set({
          user: response.data.user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } else {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      }
    } catch (error) {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    }
  },

  clearError: () => set({ error: null }),
}));
