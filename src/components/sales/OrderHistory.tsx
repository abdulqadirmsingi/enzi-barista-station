import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useOrders } from "@/hooks/useOrders";
import { useSales } from "@/hooks/useSales";
import { ReceiptModal } from "@/components/sales/ReceiptModal";
import { formatCurrency } from "@/utils/currency";
import { Order, ReceiptData } from "@/types";
import { Clock, Receipt, ShoppingCart } from "lucide-react";

export const OrderHistory = () => {
  const { orders, loading: ordersLoading, fetchUserOrders } = useOrders();
  const { getOrderReceipt, loading: receiptLoading } = useSales();
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [currentReceipt, setCurrentReceipt] = useState<ReceiptData | null>(
    null
  );

  useEffect(() => {
    fetchUserOrders(1, 20); // Load first 20 orders
  }, [fetchUserOrders]);

  const handleViewReceipt = async (order: Order) => {
    const receipt = await getOrderReceipt(order.id);
    if (receipt) {
      setCurrentReceipt(receipt);
      setShowReceiptModal(true);
    }
  };

  if (ordersLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Order History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center py-8 text-muted-foreground">
            Loading orders...
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Order History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {orders.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground">
              No orders found. Place your first order to see it here!
            </p>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="secondary">#{order.id.slice(-8)}</Badge>
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(order.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {order.itemCount} items •{" "}
                      {order.items.map((item) => item.name).join(", ")}
                    </p>
                    <p className="font-semibold text-lg">
                      {formatCurrency(order.totalAmount)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewReceipt(order)}
                      disabled={receiptLoading}
                      className="flex items-center gap-2"
                    >
                      <Receipt className="w-4 h-4" />
                      {receiptLoading ? "Loading..." : "Receipt"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <ReceiptModal
        open={showReceiptModal}
        onOpenChange={setShowReceiptModal}
        receiptData={currentReceipt}
      />
    </>
  );
};
