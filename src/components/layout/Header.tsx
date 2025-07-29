import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/authStore";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Coffee, LogOut, BarChart3, ShoppingCart } from "lucide-react";

export const Header = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged out successfully",
        description: "See you soon!",
      });
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      // Even if logout fails, redirect to home
      navigate("/");
    }
  };

  if (!user) return null;

  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Coffee className="w-6 h-6" />
            <h1 className="text-xl font-bold">Enzi Coffee POS</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-sm text-muted-foreground">
              Welcome, <span className="font-medium">{user.name}</span>
            </div>

            <nav className="flex items-center gap-2">
              <Button
                variant={location.pathname === "/pos" ? "default" : "ghost"}
                onClick={() => navigate("/pos")}
                size="sm"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                POS
              </Button>
              <Button
                variant={location.pathname === "/sales" ? "default" : "ghost"}
                onClick={() => navigate("/sales")}
                size="sm"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Sales
              </Button>
              <Button variant="ghost" onClick={handleLogout} size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};
