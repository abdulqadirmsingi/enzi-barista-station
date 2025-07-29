import { Header } from "@/components/layout/Header";
import { SalesDashboard } from "@/components/sales/SalesDashboard";

const Sales = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Sales Analytics
          </h1>
          <p className="text-muted-foreground">
            Track your coffee shop's performance, orders, and revenue
          </p>
        </div>

        <SalesDashboard />
      </main>
    </div>
  );
};

export default Sales;
