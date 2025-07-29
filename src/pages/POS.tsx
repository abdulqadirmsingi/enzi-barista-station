import { Header } from '@/components/layout/Header';
import { MenuGrid } from '@/components/pos/MenuGrid';
import { CurrentOrder } from '@/components/pos/CurrentOrder';

const POS = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <MenuGrid />
          </div>
          <div>
            <CurrentOrder />
          </div>
        </div>
      </main>
    </div>
  );
};

export default POS;