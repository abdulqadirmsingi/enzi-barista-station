/**
 * Demo script to showcase the enhanced toast and logging system
 * This file can be imported in any component to test the new features
 */

import { toast, logAction } from "@/utils/toast";

// Demo functions to test different types of toasts and logging
export const demoToasts = {
  // Test success toasts
  testSuccess: () => {
    toast.success("Order completed!", "Payment processed successfully");
    logAction.pos.checkoutSuccess("ORD-001", 15.99);
  },

  // Test error toasts
  testError: () => {
    toast.error(
      "Payment failed",
      "Please check your payment method and try again"
    );
    logAction.pos.checkoutError("Insufficient funds");
  },

  // Test warning toasts
  testWarning: () => {
    toast.warning("Low inventory", "Espresso beans are running low");
  },

  // Test info toasts
  testInfo: () => {
    toast.info("Menu updated", "New seasonal drinks are now available");
    logAction.menu.loadSuccess(25);
  },

  // Test loading toasts
  testLoading: () => {
    toast.loading(
      "Processing order...",
      "Please wait while we prepare your receipt"
    );
  },

  // Test authentication flows
  testAuth: () => {
    // Simulate login
    logAction.auth.login("demo@enzi.coffee");
    toast.loading("Signing you in...", "Verifying credentials");

    setTimeout(() => {
      const user = { id: "1", email: "demo@enzi.coffee", name: "Demo User" };
      logAction.auth.loginSuccess(user);
      toast.success("Welcome back!", `Successfully signed in as ${user.name}`);
    }, 1500);
  },

  // Test POS operations
  testPOS: () => {
    const espresso = { id: 1, name: "Espresso", price: 3.5 };
    const cappuccino = { id: 2, name: "Cappuccino", price: 4.25 };

    // Add items
    logAction.pos.addItem(espresso, 1);
    toast.success(
      `Added ${espresso.name}`,
      `Added to your order for $${espresso.price.toFixed(2)}`
    );

    setTimeout(() => {
      logAction.pos.addItem(cappuccino, 2);
      toast.success(
        `Added ${cappuccino.name}`,
        `Quantity: 2 for $${(cappuccino.price * 2).toFixed(2)}`
      );
    }, 1000);

    setTimeout(() => {
      logAction.pos.updateQuantity(espresso, 1, 2);
      toast.success(`Updated ${espresso.name}`, "Quantity changed to 2");
    }, 2000);

    setTimeout(() => {
      logAction.pos.clearOrder();
      toast.info("Order cleared", "All items removed from your order");
    }, 3000);
  },

  // Test API operations
  testAPI: () => {
    logAction.api.request("POST", "/api/orders", { total: 12.75 });
    toast.loading("Submitting order...", "Processing your request");

    setTimeout(() => {
      logAction.api.response("POST", "/api/orders", 201, {
        orderId: "ORD-123",
      });
      toast.success(
        "Order submitted!",
        "Your order has been successfully processed"
      );
    }, 2000);
  },

  // Test all toast types in sequence
  testSequence: () => {
    toast.loading("Starting demo...", "Showcasing all toast types");

    setTimeout(
      () => toast.info("Info toast", "This is an informational message"),
      1000
    );
    setTimeout(
      () =>
        toast.success("Success toast", "This indicates a successful operation"),
      2000
    );
    setTimeout(
      () => toast.warning("Warning toast", "This is a warning message"),
      3000
    );
    setTimeout(
      () => toast.error("Error toast", "This indicates an error occurred"),
      4000
    );
    setTimeout(
      () =>
        toast.info("Demo complete!", "All toast types have been demonstrated"),
      5000
    );
  },
};

// Console logging examples
export const demoLogs = {
  // Log different types of operations
  logOperations: () => {
    console.log("🚀 Starting demo logging...");

    logAction.auth.login("test@example.com");
    logAction.pos.addItem({ id: 1, name: "Test Item", price: 5.99 }, 1);
    logAction.menu.load();
    logAction.sales.load({ startDate: "2024-01-01", endDate: "2024-01-31" });
    logAction.api.request("GET", "/api/menu");

    console.log("✅ Demo logging complete!");
  },
};

// Usage instructions in console
console.log(`
🎉 Enhanced Toast & Logging System Loaded!

To test the new features, run any of these commands in the console:

// Test different toast types:
demoToasts.testSuccess()
demoToasts.testError()
demoToasts.testWarning()
demoToasts.testInfo()
demoToasts.testLoading()

// Test complete workflows:
demoToasts.testAuth()
demoToasts.testPOS()
demoToasts.testAPI()
demoToasts.testSequence()

// Test logging:
demoLogs.logOperations()

// Individual toast calls:
import { toast } from "@/utils/toast"
toast.success("Your message", "Optional description")
toast.error("Error message", "Error details")
toast.warning("Warning message", "Warning details")
toast.info("Info message", "Additional info")
toast.loading("Loading message", "Loading details")

All actions are automatically logged to the console with timestamps and structured data.
`);
