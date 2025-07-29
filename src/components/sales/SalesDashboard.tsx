import { useState, useEffect, useCallback } from "react";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {subtitle && (
              <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
            )}
          </div>
          <div className="flex flex-col items-end gap-2">
            <Icon className="h-4 w-4 text-muted-foreground" />
            {trend && (
              <Badge
                variant={trend.isPositive ? "default" : "destructive"}
                className="text-xs"
              >
                {trend.isPositive ? "+" : ""}
                {trend.value.toFixed(1)}%
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Today's Summary */}
      {todaysSummary && (
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Calendar className="w-6 h-6" />
            Today's Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
        </div>
      )}

      {/* Sales Analytics */}
      <div>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <TrendingUp className="w-6 h-6" />
          Sales Analytics
        </h2>

        <SalesFilters
          onFiltersChange={handleFiltersChange}
          initialFilters={filters}
        />

        {loading ? (
          <Card className="mt-4">
            <CardContent className="p-6">
              <p className="text-center text-muted-foreground">
                Loading sales data...
              </p>
            </CardContent>
          </Card>
        ) : salesStats ? (
          <div className="mt-4 space-y-4">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                value={formatCurrency(salesStats.avgOrderValue / 100)}
                icon={TrendingUp}
                subtitle="Per order value"
              />
            </div>

            {/* Top Items */}
            {salesStats.topItems.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Coffee className="w-5 h-5" />
                    Top Selling Items
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {salesStats.topItems.map((item, index) => (
                      <div
                        key={item.name}
                        className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <Badge
                            variant="outline"
                            className="w-8 h-8 rounded-full flex items-center justify-center"
                          >
                            {index + 1}
                          </Badge>
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {item.quantity} sold
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">
                            {formatCurrency(item.revenue / 100)}
                          </p>
                          <p className="text-sm text-muted-foreground">
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
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Recent Orders
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {salesOrders.slice(0, 5).map((order) => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div>
                          <p className="font-medium">#{order.id.slice(-8)}</p>
                          <p className="text-sm text-muted-foreground">
                            {order.user.name} •{" "}
                            {new Date(order.createdAt).toLocaleString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">
                            {formatCurrency(order.totalAmount)}
                          </p>
                          <p className="text-sm text-muted-foreground">
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
          <Card className="mt-4">
            <CardContent className="p-6">
              <p className="text-center text-muted-foreground">
                No sales data found for the selected period.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Order History */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Order Management</h2>
        <OrderHistory />
      </div>
    </div>
  );
};
