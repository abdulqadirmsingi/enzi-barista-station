import { formatCurrency } from '@/utils/currency';
import { OrderItem } from '@/types';
import { forwardRef } from 'react';

interface PrintableReceiptProps {
  orderId: string;
  items: OrderItem[];
  total: number;
  timestamp: string;
  baristaName?: string;
}

export const PrintableReceipt = forwardRef<HTMLDivElement, PrintableReceiptProps>(
  ({ orderId, items, total, timestamp, baristaName }, ref) => {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    
    return (
      <div ref={ref} className="bg-white text-black p-6 max-w-sm mx-auto font-mono text-sm">
        {/* Header */}
        <div className="text-center border-b-2 border-dashed border-gray-400 pb-4 mb-4">
          <h1 className="text-lg font-bold">ENZI COFFEE SHOP</h1>
          <p className="text-xs">Premium Coffee Experience</p>
          <p className="text-xs">Tel: +255 123 456 789</p>
          <p className="text-xs">Email: info@enzicoffee.com</p>
        </div>

        {/* Order Info */}
        <div className="mb-4 text-xs">
          <div className="flex justify-between">
            <span>Order ID:</span>
            <span className="font-bold">{orderId}</span>
          </div>
          <div className="flex justify-between">
            <span>Date:</span>
            <span>{new Date(timestamp).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Time:</span>
            <span>{new Date(timestamp).toLocaleTimeString()}</span>
          </div>
          {baristaName && (
            <div className="flex justify-between">
              <span>Barista:</span>
              <span>{baristaName}</span>
            </div>
          )}
        </div>

        {/* Items */}
        <div className="border-b border-dashed border-gray-400 pb-4 mb-4">
          <div className="flex justify-between font-bold text-xs mb-2">
            <span>ITEM</span>
            <span>QTY</span>
            <span>PRICE</span>
          </div>
          {items.map((item) => (
            <div key={item.id} className="mb-2">
              <div className="flex justify-between text-xs">
                <span className="flex-1 truncate">{item.name}</span>
                <span className="w-8 text-center">{item.quantity}</span>
                <span className="w-16 text-right">{formatCurrency(item.price)}</span>
              </div>
              <div className="flex justify-between text-xs font-bold">
                <span></span>
                <span></span>
                <span className="w-16 text-right">{formatCurrency(item.price * item.quantity)}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="space-y-1 text-xs">
          <div className="flex justify-between">
            <span>Total Items:</span>
            <span>{totalItems}</span>
          </div>
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>{formatCurrency(total)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (18%):</span>
            <span>{formatCurrency(total * 0.18)}</span>
          </div>
          <div className="border-t border-gray-400 pt-1">
            <div className="flex justify-between font-bold text-sm">
              <span>TOTAL:</span>
              <span>{formatCurrency(total * 1.18)}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs mt-6 border-t border-dashed border-gray-400 pt-4">
          <p className="mb-2">THANK YOU FOR YOUR VISIT!</p>
          <p>Follow us @enzicoffee</p>
          <p className="mt-2">Powered by Enzi POS System</p>
        </div>
      </div>
    );
  }
);

PrintableReceipt.displayName = 'PrintableReceipt';