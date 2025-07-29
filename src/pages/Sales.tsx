import { Header } from "@/components/layout/Header";
import { SalesDashboard } from "@/components/sales/SalesDashboard";

const Sales = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4">
        <SalesDashboard />
      </main>
    </div>
  );
};

export default Sales;
