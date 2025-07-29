import { createContext, useContext, useEffect, ReactNode } from "react";
import { useAuthStore } from "@/stores/authStore";

interface AuthContextType {
  isInitialized: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { checkAuth, isLoading } = useAuthStore();

  useEffect(() => {
    // Check if user is authenticated on app startup
    checkAuth();
  }, [checkAuth]);

  const value = {
    isInitialized: !isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Export the context for use in hooks
export { AuthContext };
