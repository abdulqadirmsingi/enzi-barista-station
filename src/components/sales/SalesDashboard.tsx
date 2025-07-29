import { useState, useEffect, useCallback } from "react";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSales } from "@/hooks/useSales";
import { formatCurrency } from "@/utils/currency";
import { SalesFilters } from "./SalesFilters";
import { OrderHistory } from "./OrderHistory";
import {
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Coffee,
  Calendar,
  Clock,
  BarChart3,
  History,
} from "lucide-react";

export const SalesDashboard = () => {
  const {
    salesStats,
    salesOrders,
    loading,
    fetchSalesStats,
    fetchTodaysSales,
  } = useSales();

  const [todaysSummary, setTodaysSummary] = useState<{
    totalOrders: number;
    totalRevenue: number;
    totalItems: number;
  } | null>(null);

  const [filters, setFilters] = useState({
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
    shift: undefined as "AM" | "PM" | undefined,
  });

  const loadTodaysSales = useCallback(async () => {
    try {
      const response = await fetchTodaysSales();
      setTodaysSummary(response.summary);
    } catch (error) {
      console.error("Failed to load today's sales:", error);
    }
  }, [fetchTodaysSales]);

  useEffect(() => {
    // Load today's sales on component mount
    loadTodaysSales();
  }, [loadTodaysSales]);

  useEffect(() => {
    // Load filtered sales data when filters change
    fetchSalesStats(filters);
  }, [fetchSalesStats, filters]);

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    fetchSalesStats(newFilters);
  };

  const StatCard = ({
    title,
    value,
    icon: Icon,
    subtitle,
    trend,
  }: {
    title: string;
    value: string | number;
    icon: React.ComponentType<{ className?: string }>;
    subtitle?: string;
    trend?: { value: number; isPositive: boolean };
  }) => (
    <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-white to-gray-50/50 hover:shadow-xl transition-all duration-300 group">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="relative">
            <div className="absolute -top-2 -left-2 w-10 h-10 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <Icon className="h-6 w-6 text-amber-600 relative z-10 group-hover:scale-110 transition-transform duration-300" />
          </div>
          {trend && (
            <Badge
              variant={trend.isPositive ? "default" : "destructive"}
              className="text-xs px-2 py-1 rounded-full bg-gradient-to-r shadow-sm"
            >
              {trend.isPositive ? "+" : ""}
              {trend.value.toFixed(1)}%
            </Badge>
          )}
        </div>
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
            {title}
          </p>
          <p className="text-2xl font-bold text-gray-900 group-hover:text-amber-700 transition-colors">
            {value}
          </p>
          {subtitle && (
            <p className="text-xs text-gray-500 font-medium">{subtitle}</p>
          )}
        </div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-orange-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-amber-50/30 p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-3">
          Sales Dashboard
        </h1>
        <p className="text-gray-600 text-base font-medium">
          Comprehensive insights and management tools for your business
        </p>
      </div>

      {/* Tabs Navigation */}
      <Tabs defaultValue="performance" className="max-w-7xl mx-auto">
        <div className="flex justify-center mb-8">
          <TabsList className="grid grid-cols-3 w-full max-w-xl h-12 p-1 bg-white/80 backdrop-blur border-0 shadow-lg rounded-xl">
            <TabsTrigger
              value="performance"
              className="flex items-center gap-2 text-sm font-medium py-2 px-4 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-500 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
            >
              <Calendar className="w-4 h-4" />
              Performance
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="flex items-center gap-2 text-sm font-medium py-2 px-4 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-500 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
            >
              <BarChart3 className="w-4 h-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger
              value="orders"
              className="flex items-center gap-2 text-sm font-medium py-2 px-4 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-500 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
            >
              <History className="w-4 h-4" />
              Orders
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-8">
          {todaysSummary && (
            <section className="space-y-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2 flex items-center justify-center gap-2">
                  <Calendar className="w-6 h-6 text-amber-600" />
                  Today's Performance
                </h2>
                <p className="text-gray-600 text-sm font-medium">
                  Real-time insights into your daily operations
                </p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <StatCard
                  title="Today's Revenue"
                  value={formatCurrency(todaysSummary.totalRevenue)}
                  icon={DollarSign}
                  subtitle="Total sales today"
                />
                <StatCard
                  title="Orders Completed"
                  value={todaysSummary.totalOrders}
                  icon={ShoppingCart}
                  subtitle="Orders placed today"
                />
                <StatCard
                  title="Items Sold"
                  value={todaysSummary.totalItems}
                  icon={Coffee}
                  subtitle="Total items sold"
                />
              </div>
            </section>
          )}
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-8">
          <section className="space-y-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2 flex items-center justify-center gap-2">
                <TrendingUp className="w-6 h-6 text-amber-600" />
                Sales Analytics
              </h2>
              <p className="text-gray-600 text-sm font-medium">
                Comprehensive analysis of your business performance
              </p>
            </div>

            <div className="mb-8">
              <SalesFilters
                onFiltersChange={handleFiltersChange}
                initialFilters={filters}
              />
            </div>

            {loading ? (
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur">
                <CardContent className="p-8">
                  <div className="flex flex-col items-center space-y-3">
                    <div className="w-12 h-12 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin"></div>
                    <p className="text-base text-gray-600 font-medium">
                      Loading sales data...
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : salesStats ? (
              <div className="space-y-12">
                {/* Stats Overview */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <StatCard
                    title="Total Revenue"
                    value={formatCurrency(salesStats.totalRevenue)}
                    icon={DollarSign}
                    subtitle="For selected period"
                  />
                  <StatCard
                    title="Total Orders"
                    value={salesStats.totalOrders}
                    icon={ShoppingCart}
                    subtitle="Orders completed"
                  />
                  <StatCard
                    title="Average Order"
                    value={formatCurrency(salesStats.avgOrderValue)}
                    icon={TrendingUp}
                    subtitle="Per order value"
                  />
                </div>

                {/* Top Items */}
                {salesStats.topItems.length > 0 && (
                  <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-amber-50/30 hover:shadow-xl transition-all duration-300">
                    <CardHeader className="pb-6">
                      <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-800">
                        <div className="p-2 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full">
                          <Coffee className="w-5 h-5 text-amber-600" />
                        </div>
                        Top Selling Items
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-6 pb-6">
                      <div className="space-y-4">
                        {salesStats.topItems.map((item, index) => (
                          <div
                            key={item.name}
                            className="flex items-center justify-between p-4 bg-white/80 backdrop-blur rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
                          >
                            <div className="flex items-center gap-4">
                              <div className="relative">
                                <Badge
                                  variant="outline"
                                  className={`w-10 h-10 rounded-full flex items-center justify-center text-base font-bold border-2 ${
                                    index === 0
                                      ? "border-amber-400 bg-amber-50 text-amber-700"
                                      : index === 1
                                      ? "border-gray-400 bg-gray-50 text-gray-700"
                                      : "border-orange-400 bg-orange-50 text-orange-700"
                                  }`}
                                >
                                  {index + 1}
                                </Badge>
                                {index === 0 && (
                                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full animate-pulse"></div>
                                )}
                              </div>
                              <div>
                                <p className="font-bold text-base text-gray-800">
                                  {item.name}
                                </p>
                                <p className="text-gray-600 text-sm font-medium">
                                  {item.quantity} sold
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-lg text-gray-900">
                                {formatCurrency(item.revenue)}
                              </p>
                              <p className="text-gray-600 text-sm font-medium">
                                Revenue
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Recent Orders */}
                {salesOrders.length > 0 && (
                  <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-blue-50/30 hover:shadow-xl transition-all duration-300">
                    <CardHeader className="pb-6">
                      <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-800">
                        <div className="p-2 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full">
                          <Clock className="w-5 h-5 text-blue-600" />
                        </div>
                        Recent Orders
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-6 pb-6">
                      <div className="space-y-4">
                        {salesOrders.slice(0, 5).map((order) => (
                          <div
                            key={order.id}
                            className="flex items-center justify-between p-4 bg-white/80 backdrop-blur rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-blue-200"
                          >
                            <div>
                              <div className="flex items-center gap-3 mb-2">
                                <Badge
                                  variant="secondary"
                                  className="px-2 py-1 text-xs font-bold"
                                >
                                  #{order.id.slice(-8)}
                                </Badge>
                                <span className="text-blue-600 font-medium">
                                  •
                                </span>
                                <span className="text-gray-600 font-medium text-xs">
                                  {order.user.name}
                                </span>
                              </div>
                              <p className="text-gray-500 text-xs font-medium">
                                {new Date(order.createdAt).toLocaleString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-lg text-gray-900">
                                {formatCurrency(order.totalAmount)}
                              </p>
                              <p className="text-gray-600 text-sm font-medium">
                                {order.itemCount} items
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            ) : (
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur">
                <CardContent className="p-12">
                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                      <TrendingUp className="w-6 h-6 text-gray-400" />
                    </div>
                    <p className="text-base text-gray-600 font-medium">
                      No sales data found for the selected period.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </section>
        </TabsContent>

        {/* Orders Tab */}
        <TabsContent value="orders" className="space-y-8">
          <section className="space-y-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2 flex items-center justify-center gap-2">
                <History className="w-6 h-6 text-amber-600" />
                Order Management
              </h2>
              <p className="text-gray-600 text-sm font-medium">
                Complete order history and management tools
              </p>
            </div>
            <OrderHistory />
          </section>
        </TabsContent>
      </Tabs>
    </div>
  );
};
