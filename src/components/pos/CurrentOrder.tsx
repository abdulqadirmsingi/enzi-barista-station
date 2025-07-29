import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useOrderStore } from "@/stores/orderStore";
import { useAuthStore } from "@/stores/authStore";
import { formatCurrency } from "@/utils/currency";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { OrderSummaryModal } from "./OrderSummaryModal";
import { OrderSuccessModal } from "./OrderSuccessModal";
import { useState } from "react";
import { useOrders } from "@/hooks/useOrders";
import { CreateOrderRequest, Order } from "@/types";

export const CurrentOrder = () => {
  const { currentOrder, updateQuantity, removeItem, clearOrder, getTotal } =
    useOrderStore();
  const user = useAuthStore((state) => state.user);
  const { toast } = useToast();
  const { createOrder, loading } = useOrders();
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [lastOrder, setLastOrder] = useState<Order | null>(null);

  const handleOpenSummary = () => {
    if (currentOrder.length === 0) {
      toast({
        title: "Empty order",
        description: "Please add items to your order first.",
        variant: "destructive",
      });
      return;
    }
    setShowSummaryModal(true);
  };

  const handleConfirmOrder = async () => {
    try {
      const orderData: CreateOrderRequest = {
        items: currentOrder,
        totalAmount: Math.round(getTotal()), // Amount is already in base currency units
        itemCount: currentOrder.reduce((sum, item) => sum + item.quantity, 0),
      };

      const order = await createOrder(orderData);

      clearOrder();
      setShowSummaryModal(false);
      setLastOrder(order);
      setShowSuccessModal(true);
    } catch (error) {
      // Error handling is done in the useOrders hook
      console.error("Failed to place order:", error);
    }
  };

  return (
    <Card className="h-fit">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="w-5 h-5" />
          Current Order
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {currentOrder.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            No items in order
          </p>
        ) : (
          <>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {currentOrder.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 bg-order-item rounded-lg"
                >
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {formatCurrency(item.price)} each
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="w-8 text-center font-medium">
                      {item.quantity}
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => removeItem(item.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>{formatCurrency(getTotal())}</span>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={clearOrder}
                  className="flex-1"
                >
                  Clear
                </Button>
                <Button
                  onClick={handleOpenSummary}
                  className="flex-1 bg-coffee hover:bg-coffee-medium"
                >
                  Place Order
                </Button>
              </div>
            </div>
          </>
        )}
      </CardContent>

      <OrderSummaryModal
        open={showSummaryModal}
        onOpenChange={setShowSummaryModal}
        onConfirm={handleConfirmOrder}
        loading={loading}
      />

      <OrderSuccessModal
        open={showSuccessModal}
        onOpenChange={setShowSuccessModal}
        order={lastOrder}
      />
    </Card>
  );
};
