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
      <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-indigo-50/30">
        <CardHeader className="pb-8">
          <CardTitle className="flex items-center gap-3 text-2xl font-bold text-gray-800">
            <div className="p-3 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full">
              <ShoppingCart className="w-6 h-6 text-indigo-600" />
            </div>
            Order History
          </CardTitle>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <div className="flex flex-col items-center space-y-4 py-12">
            <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            <p className="text-lg text-gray-600 font-medium">
              Loading orders...
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-indigo-50/30 hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-8">
          <CardTitle className="flex items-center gap-3 text-2xl font-bold text-gray-800">
            <div className="p-3 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full">
              <ShoppingCart className="w-6 h-6 text-indigo-600" />
            </div>
            Order History
          </CardTitle>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          {orders.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                <ShoppingCart className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-lg text-gray-600 font-medium">
                No orders found. Place your first order to see it here!
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="flex flex-col lg:flex-row lg:items-center justify-between p-6 bg-white/80 backdrop-blur rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-indigo-200 gap-4"
                >
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <Badge
                        variant="secondary"
                        className="px-3 py-1 text-sm font-bold bg-indigo-100 text-indigo-700"
                      >
                        #{order.id.slice(-8)}
                      </Badge>
                      <span className="text-indigo-600 font-medium">•</span>
                      <span className="text-sm text-gray-600 flex items-center gap-2 font-medium">
                        <Clock className="w-4 h-4" />
                        {new Date(order.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600 font-medium">
                        {order.itemCount} items •{" "}
                        {order.items.map((item) => item.name).join(", ")}
                      </p>
                      <p className="font-bold text-xl text-gray-900">
                        {formatCurrency(order.totalAmount)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewReceipt(order)}
                      disabled={receiptLoading}
                      className="flex items-center gap-2 px-4 py-2 border-gray-200 hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-700 transition-all duration-300 rounded-lg shadow-sm"
                    >
                      <Receipt className="w-4 h-4" />
                      {receiptLoading ? "Loading..." : "View Receipt"}
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
