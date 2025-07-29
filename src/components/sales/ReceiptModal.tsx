import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PrintableReceipt } from '@/components/pos/PrintableReceipt';
import { OrderItem } from '@/types';
import { useRef } from 'react';
import { Printer, Download } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';

interface ReceiptModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderId: string;
  items: OrderItem[];
  total: number;
  timestamp: string;
  baristaName?: string;
}

export const ReceiptModal = ({
  open,
  onOpenChange,
  orderId,
  items,
  total,
  timestamp,
  baristaName
}: ReceiptModalProps) => {
  const receiptRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: receiptRef,
    documentTitle: `Receipt-${orderId}`,
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Printer className="w-5 h-5" />
            Order Receipt
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex justify-center bg-gray-50 p-4 rounded-lg">
          <PrintableReceipt
            ref={receiptRef}
            orderId={orderId}
            items={items}
            total={total}
            timestamp={timestamp}
            baristaName={baristaName}
          />
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
            onClick={handlePrint}
            className="flex-1 bg-coffee hover:bg-coffee-medium"
          >
            <Printer className="w-4 h-4 mr-2" />
            Print Receipt
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};