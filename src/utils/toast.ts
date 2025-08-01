import { useToast } from "@/hooks/use-toast";

// Create a singleton toast instance that can be used outside of React components
let toastInstance: ReturnType<typeof useToast> | null = null;

export const initializeToast = (toastHook: ReturnType<typeof useToast>) => {
  toastInstance = toastHook;
};

export const toast = {
  success: (title: string, description?: string) => {
    if (toastInstance) {
      toastInstance.toast({
        title: title,
        description: description,
        variant: "default",
      });
    }
  },
  error: (title: string, description?: string) => {
    if (toastInstance) {
      toastInstance.toast({
        title: title,
        description: description,
        variant: "destructive",
      });
    }
  },
  info: (title: string, description?: string) => {
    if (toastInstance) {
      toastInstance.toast({
        title: title,
        description: description,
        variant: "default",
      });
    }
  },
  warning: (title: string, description?: string) => {
    if (toastInstance) {
      toastInstance.toast({
        title: title,
        description: description,
        variant: "destructive",
      });
    }
  },
};
