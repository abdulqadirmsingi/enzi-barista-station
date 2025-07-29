import { useState, useCallback } from "react";
import { apiService } from "@/services/api";
import { SalesStats, Order, ReceiptData } from "@/types";
import { useToast } from "@/hooks/use-toast";

export const useSales = () => {
  const [loading, setLoading] = useState(false);
  const [salesStats, setSalesStats] = useState<SalesStats | null>(null);
  const [salesOrders, setSalesOrders] = useState<Order[]>([]);
  const { toast } = useToast();

  const fetchSalesStats = useCallback(
    async (filters?: {
      startDate?: string;
      endDate?: string;
      shift?: "AM" | "PM";
    }) => {
      setLoading(true);
      try {
        const response = await apiService.getSalesStats(filters);
        if (response.success && response.data) {
          setSalesStats(response.data.stats);
          setSalesOrders(response.data.orders);
          return response.data;
        } else {
          throw new Error(response.message || "Failed to fetch sales data");
        }
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Failed to fetch sales data";
        toast({
          title: "Error loading sales data",
          description: message,
          variant: "destructive",
        });
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [toast]
  );

  const fetchTodaysSales = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiService.getTodaysSales();
      if (response.success && response.data) {
        return response.data;
      } else {
        throw new Error(response.message || "Failed to fetch today's sales");
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to fetch today's sales";
      toast({
        title: "Error loading today's sales",
        description: message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const getOrderReceipt = useCallback(
    async (orderId: string): Promise<ReceiptData | null> => {
      setLoading(true);
      try {
        const response = await apiService.getOrderReceipt(orderId);
        if (response.success && response.data) {
          return response.data.receipt;
        } else {
          throw new Error(response.message || "Failed to fetch receipt");
        }
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Failed to fetch receipt";
        toast({
          title: "Error loading receipt",
          description: message,
          variant: "destructive",
        });
        return null;
      } finally {
        setLoading(false);
      }
    },
    [toast]
  );

  return {
    loading,
    salesStats,
    salesOrders,
    fetchSalesStats,
    fetchTodaysSales,
    getOrderReceipt,
  };
};
