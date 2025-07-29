import { toast as baseToast } from "@/hooks/use-toast";

// Enhanced toast utilities with better UX
export const toast = {
  success: (message: string, description?: string) => {
    return baseToast({
      title: message,
      description,
      variant: "success",
      duration: 2000,
    });
  },

  error: (message: string, description?: string) => {
    return baseToast({
      title: message,
      description,
      variant: "destructive",
      duration: 3500,
    });
  },

  warning: (message: string, description?: string) => {
    return baseToast({
      title: message,
      description,
      variant: "warning",
      duration: 2500,
    });
  },

  info: (message: string, description?: string) => {
    return baseToast({
      title: message,
      description,
      variant: "default",
      duration: 1800,
    });
  },

  loading: (message: string, description?: string) => {
    return baseToast({
      title: message,
      description,
      variant: "default",
      duration: 1200,
    });
  },
};
