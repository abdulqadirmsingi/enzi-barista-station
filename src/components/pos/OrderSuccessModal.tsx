import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Receipt, Clock } from "lucide-react";
import { Order } from "@/types";
import { formatCurrency } from "@/utils/currency";
import { useState } from "react";
import { ReceiptModal } from "@/components/sales/ReceiptModal";
import { useSales } from "@/hooks/useSales";

interface OrderSuccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: Order | null;
}

export const OrderSuccessModal = ({
  open,
  onOpenChange,
  order,
}: OrderSuccessModalProps) => {
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [receiptData, setReceiptData] = useState(null);
  const { getOrderReceipt, loading } = useSales();

  const handleViewReceipt = async () => {
    if (!order) return;

    const receipt = await getOrderReceipt(order.id);
    if (receipt) {
      setReceiptData(receipt);
      setShowReceiptModal(true);
    }
  };

  if (!order) {
    return null;
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-6 h-6" />
              Order Placed Successfully!
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <div className="text-center space-y-2">
                  <Badge
                    variant="outline"
                    className="bg-green-100 text-green-700 border-green-300"
                  >
                    Order #{order.id.slice(-8)}
                  </Badge>
                  <p className="text-2xl font-bold text-green-700">
                    {formatCurrency(order.totalAmount)}
                  </p>
                  <p className="text-sm text-green-600">
                    {order.itemCount} items •{" "}
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <h4 className="font-medium">Order Items:</h4>
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center p-2 bg-muted/50 rounded"
                >
                  <span className="font-medium">{item.name}</span>
                  <div className="text-right">
                    <span className="text-sm text-muted-foreground">
                      x{item.quantity}
                    </span>
                    <br />
                    <span className="font-medium">
                      {formatCurrency(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <Card className="bg-coffee-light/10 border-coffee-light/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-coffee-dark">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">
                    <strong>Estimated preparation time:</strong> 5-8 minutes
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Close
            </Button>
            <Button
              onClick={handleViewReceipt}
              disabled={loading}
              className="flex-1 bg-coffee hover:bg-coffee-medium"
            >
              <Receipt className="w-4 h-4 mr-2" />
              {loading ? "Loading..." : "View Receipt"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <ReceiptModal
        open={showReceiptModal}
        onOpenChange={setShowReceiptModal}
        receiptData={receiptData}
      />
    </>
  );
};
