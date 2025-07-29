import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useOrderStore } from '@/stores/orderStore';
import { formatCurrency } from '@/utils/currency';
import { Coffee, Clock } from 'lucide-react';

interface OrderSummaryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export const OrderSummaryModal = ({ open, onOpenChange, onConfirm }: OrderSummaryModalProps) => {
  const { currentOrder, getTotal } = useOrderStore();

  const totalItems = currentOrder.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Coffee className="w-5 h-5" />
            Order Summary
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="border rounded-lg p-4 bg-coffee-light/10">
            <div className="space-y-3">
              {currentOrder.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div>
                    <span className="font-medium">{item.name}</span>
                    <span className="text-muted-foreground ml-2">x{item.quantity}</span>
                  </div>
                  <span className="font-medium">
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2 border-t pt-4">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Total Items:</span>
              <span>{totalItems}</span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span>Total Amount:</span>
              <span className="text-coffee">{formatCurrency(getTotal())}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
            <Clock className="w-4 h-4" />
            <span>Estimated preparation time: 5-8 minutes</span>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
            Back to Order
          </Button>
          <Button onClick={onConfirm} className="w-full sm:w-auto bg-coffee hover:bg-coffee-medium">
            Confirm Order
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};