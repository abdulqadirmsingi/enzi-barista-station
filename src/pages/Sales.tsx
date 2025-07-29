import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/utils/currency';
import { BarChart3, DollarSign, ShoppingBag, Clock } from 'lucide-react';

// Mock sales data - replace with Supabase queries
const mockOrders = [
  {
    id: "order_1",
    total: 7000,
    itemCount: 2,
    timestamp: new Date().toISOString(),
  },
  {
    id: "order_2", 
    total: 3500,
    itemCount: 1,
    timestamp: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "order_3",
    total: 6000,
    itemCount: 2,
    timestamp: new Date(Date.now() - 7200000).toISOString(),
  }
];

const Sales = () => {
  const totalRevenue = mockOrders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = mockOrders.length;
  const averageOrder = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="w-6 h-6" />
            <h1 className="text-2xl font-bold">Daily Sales Report</h1>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalOrders}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Order</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(averageOrder)}</div>
              </CardContent>
            </Card>
          </div>

          {/* Orders List */}
          <Card>
            <CardHeader>
              <CardTitle>Today's Orders</CardTitle>
            </CardHeader>
            <CardContent>
              {mockOrders.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No orders placed today
                </p>
              ) : (
                <div className="space-y-3">
                  {mockOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <ShoppingBag className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium">{order.id}</p>
                          <p className="text-sm text-muted-foreground">
                            {order.itemCount} items
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-bold">{formatCurrency(order.total)}</p>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {new Date(order.timestamp).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Sales;