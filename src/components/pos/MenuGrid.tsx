import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { COFFEE_MENU } from '@/data/menu';
import { useOrderStore } from '@/stores/orderStore';
import { formatCurrency } from '@/utils/currency';
import { Coffee, Plus } from 'lucide-react';

export const MenuGrid = () => {
  const addItem = useOrderStore((state) => state.addItem);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Coffee className="w-5 h-5" />
        <h2 className="text-xl font-semibold">Coffee Menu</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {COFFEE_MENU.map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-medium text-lg">{item.name}</h3>
                  <p className="text-xl font-bold text-coffee">
                    {formatCurrency(item.price)}
                  </p>
                </div>
                <Button
                  size="sm"
                  onClick={() => addItem(item)}
                  className="shrink-0"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};