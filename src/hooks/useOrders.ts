import { useState, useCallback } from "react";
import { apiService } from "@/services/api";
import { CreateOrderRequest, Order, OrdersPaginationResponse } from "@/types";
import { useToast } from "@/hooks/use-toast";

export const useOrders = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [pagination, setPagination] = useState<
    OrdersPaginationResponse["pagination"] | null
  >(null);
  const { toast } = useToast();

  const createOrder = useCallback(
    async (orderData: CreateOrderRequest) => {
      setLoading(true);
      try {
        const response = await apiService.createOrder(orderData);
        if (response.success && response.data) {
          toast({
            title: "Order placed successfully!",
            description: `Order total: TSh ${response.data.order.totalAmount.toLocaleString(
              "en-TZ"
            )}`,
          });
          return response.data.order;
        } else {
          throw new Error(response.message || "Failed to create order");
        }
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Failed to create order";
        toast({
          title: "Error placing order",
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

  const fetchUserOrders = useCallback(
    async (page = 1, limit = 10) => {
      setLoading(true);
      try {
        const response = await apiService.getUserOrders(page, limit);
        if (response.success && response.data) {
          setOrders(response.data.orders);
          setPagination(response.data.pagination);
          return response.data;
        } else {
          throw new Error(response.message || "Failed to fetch orders");
        }
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Failed to fetch orders";
        toast({
          title: "Error loading orders",
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

  const getOrderById = useCallback(
    async (orderId: string) => {
      setLoading(true);
      try {
        const response = await apiService.getOrderById(orderId);
        if (response.success && response.data) {
          return response.data.order;
        } else {
          throw new Error(response.message || "Failed to fetch order");
        }
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Failed to fetch order";
        toast({
          title: "Error loading order",
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

  return {
    loading,
    orders,
    pagination,
    createOrder,
    fetchUserOrders,
    getOrderById,
  };
};
