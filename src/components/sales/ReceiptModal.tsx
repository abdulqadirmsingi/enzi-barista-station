import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PrintableReceipt } from "@/components/pos/PrintableReceipt";
import { ReceiptData } from "@/types";
import { useRef } from "react";
import { Printer } from "lucide-react";
import { useReactToPrint } from "react-to-print";

interface ReceiptModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  receiptData: ReceiptData | null;
}

export const ReceiptModal = ({
  open,
  onOpenChange,
  receiptData,
}: ReceiptModalProps) => {
  const receiptRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: receiptRef,
    documentTitle: receiptData
      ? `Receipt-${receiptData.receiptNumber}`
      : "Receipt",
  });

  if (!receiptData) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Printer className="w-5 h-5" />
            Order Receipt
          </DialogTitle>
        </DialogHeader>

        <div className="flex justify-center bg-gray-50 p-4 rounded-lg overflow-y-auto max-h-[60vh]">
          <PrintableReceipt ref={receiptRef} receiptData={receiptData} />
        </div>

        <div className="flex flex-col sm:flex-row gap-2 pt-4">
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
