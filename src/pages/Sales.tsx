import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/utils/currency';
import { SalesFilters } from '@/components/sales/SalesFilters';
import { ReceiptModal } from '@/components/sales/ReceiptModal';
import { BarChart3, DollarSign, ShoppingBag, Clock, Printer, TrendingUp, TrendingDown } from 'lucide-react';

// Mock sales data - replace with Supabase queries
const mockOrders = [
  {
    id: "order_1",
    total: 7000,
    itemCount: 2,
    timestamp: new Date().toISOString(),
    items: [
      { id: 1, name: "Espresso", price: 2500, quantity: 1 },
      { id: 2, name: "Latte", price: 3500, quantity: 1 }
    ],
    baristaName: "John Doe"
  },
  {
    id: "order_2", 
    total: 3500,
    itemCount: 1,
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    items: [
      { id: 2, name: "Latte", price: 3500, quantity: 1 }
    ],
    baristaName: "Jane Smith"
  },
  {
    id: "order_3",
    total: 6000,
    itemCount: 2,
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    items: [
      { id: 3, name: "Cappuccino", price: 3000, quantity: 2 }
    ],
    baristaName: "Mike Johnson"
  },
  {
    id: "order_4",
    total: 8000,
    itemCount: 2,
    timestamp: new Date(Date.now() - 25200000).toISOString(), // 7 hours ago (AM shift)
    items: [
      { id: 4, name: "Mocha", price: 4000, quantity: 2 }
    ],
    baristaName: "Sarah Wilson"
  }
];

const Sales = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedShift, setSelectedShift] = useState('all');
  const [selectedReceipt, setSelectedReceipt] = useState<any>(null);

  // Filter orders based on date and shift
  const filteredOrders = mockOrders.filter(order => {
    const orderDate = new Date(order.timestamp).toISOString().split('T')[0];
    const orderHour = new Date(order.timestamp).getHours();
    
    const dateMatch = orderDate === selectedDate;
    
    const shiftMatch = selectedShift === 'all' || 
      (selectedShift === 'am' && orderHour >= 6 && orderHour < 14) ||
      (selectedShift === 'pm' && orderHour >= 14 && orderHour < 22);
    
    return dateMatch && shiftMatch;
  });

  const totalRevenue = filteredOrders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = filteredOrders.length;
  const averageOrder = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  // Previous day comparison (mock data)
  const previousDayRevenue = 15000; // Mock
  const revenueChange = totalRevenue - previousDayRevenue;
  const revenueChangePercent = previousDayRevenue > 0 ? (revenueChange / previousDayRevenue) * 100 : 0;

  const handleResetFilters = () => {
    setSelectedDate(new Date().toISOString().split('T')[0]);
    setSelectedShift('all');
  };

  const handleShowReceipt = (order: any) => {
    setSelectedReceipt(order);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-coffee-light/10 to-brown-light/20">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-coffee/10 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-coffee" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Sales Analytics</h1>
              <p className="text-muted-foreground">Monitor your coffee shop performance</p>
            </div>
          </div>

          {/* Filters */}
          <SalesFilters
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            selectedShift={selectedShift}
            onShiftChange={setSelectedShift}
            onResetFilters={handleResetFilters}
          />

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-coffee-light/20 hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
                <DollarSign className="h-5 w-5 text-coffee" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-coffee">{formatCurrency(totalRevenue)}</div>
                <div className="flex items-center gap-1 mt-2">
                  {revenueChange >= 0 ? (
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-600" />
                  )}
                  <span className={`text-sm ${revenueChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {revenueChangePercent >= 0 ? '+' : ''}{revenueChangePercent.toFixed(1)}% from yesterday
                  </span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-coffee-light/20 hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Orders</CardTitle>
                <ShoppingBag className="h-5 w-5 text-coffee" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-coffee">{totalOrders}</div>
                <div className="text-sm text-muted-foreground mt-2">
                  {selectedShift !== 'all' ? `${selectedShift.toUpperCase()} shift` : 'All shifts'}
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-coffee-light/20 hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Average Order</CardTitle>
                <BarChart3 className="h-5 w-5 text-coffee" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-coffee">{formatCurrency(averageOrder)}</div>
                <div className="text-sm text-muted-foreground mt-2">
                  Per transaction
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Orders List */}
          <Card className="border-coffee-light/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Order History
                {filteredOrders.length > 0 && (
                  <Badge variant="secondary" className="bg-coffee-light text-coffee">
                    {filteredOrders.length} orders
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {filteredOrders.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground text-lg">No orders found</p>
                  <p className="text-sm text-muted-foreground">Try adjusting your filters or check a different date</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredOrders.map((order) => {
                    const orderTime = new Date(order.timestamp);
                    const isAMShift = orderTime.getHours() >= 6 && orderTime.getHours() < 14;
                    
                    return (
                      <div key={order.id} className="flex items-center justify-between p-4 border border-coffee-light/20 rounded-lg hover:bg-coffee-light/5 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-coffee/10 rounded-full flex items-center justify-center">
                            <ShoppingBag className="w-6 h-6 text-coffee" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-semibold">{order.id}</p>
                              <Badge 
                                variant="outline" 
                                className={`text-xs ${isAMShift ? 'border-yellow-300 text-yellow-700 bg-yellow-50' : 'border-blue-300 text-blue-700 bg-blue-50'}`}
                              >
                                {isAMShift ? 'AM' : 'PM'}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {order.itemCount} items • {order.baristaName}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="font-bold text-lg text-coffee">{formatCurrency(order.total)}</p>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              {orderTime.toLocaleTimeString()}
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleShowReceipt(order)}
                            className="border-coffee/20 hover:bg-coffee/5"
                          >
                            <Printer className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Receipt Modal */}
      {selectedReceipt && (
        <ReceiptModal
          open={!!selectedReceipt}
          onOpenChange={(open) => !open && setSelectedReceipt(null)}
          orderId={selectedReceipt.id}
          items={selectedReceipt.items}
          total={selectedReceipt.total}
          timestamp={selectedReceipt.timestamp}
          baristaName={selectedReceipt.baristaName}
        />
      )}
    </div>
  );
};

export default Sales;