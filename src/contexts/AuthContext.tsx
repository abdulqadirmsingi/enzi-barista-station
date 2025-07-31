import { createContext, ReactNode } from "react";

interface AuthContextType {
  isInitialized: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  // Remove the checkAuth call on startup to make app load faster
  // Authentication will be checked only when needed

  const value = {
    isInitialized: true, // Always set to true for faster loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Export the context for use in hooks
export { AuthContext };
