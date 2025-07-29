import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Coffee, ShoppingCart, BarChart3, Users, Clock, CreditCard, Smartphone, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const features = [
    {
      icon: <Coffee className="w-8 h-8" />,
      title: "Menu Management",
      description: "Comprehensive coffee menu with customizable pricing and options"
    },
    {
      icon: <ShoppingCart className="w-8 h-8" />,
      title: "Order Processing",
      description: "Streamlined order management with real-time updates and modifications"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Sales Analytics",
      description: "Daily sales reports with revenue tracking and order insights"
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: "Payment Integration",
      description: "Secure payment processing with receipt generation"
    }
  ];

  const benefits = [
    { icon: <Zap className="w-5 h-5" />, text: "Lightning Fast Processing" },
    { icon: <Smartphone className="w-5 h-5" />, text: "Mobile-First Design" },
    { icon: <Users className="w-5 h-5" />, text: "Multi-User Support" },
    { icon: <Clock className="w-5 h-5" />, text: "Real-Time Updates" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-coffee-light/20 to-brown-light/30">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-6 bg-coffee-light text-coffee-dark">
            Next-Generation POS System
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-coffee to-brown bg-clip-text text-transparent">
            Enzi Coffee Shop
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            Revolutionary Point-of-Sale system designed for modern coffee shops. 
            Streamline your operations with our intuitive, fast, and reliable platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/login">
              <Button size="lg" className="bg-coffee hover:bg-coffee-medium text-white px-8 py-6 text-lg">
                Start Your Journey
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="border-coffee text-coffee hover:bg-coffee-light px-8 py-6 text-lg">
              Watch Demo
            </Button>
          </div>

          {/* Quick Benefits */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 text-coffee">
                {benefit.icon}
                <span className="text-sm font-medium">{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to run a successful coffee shop, all in one place
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-coffee-light/20 hover:border-coffee/30">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-coffee-light rounded-full flex items-center justify-center text-coffee group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-coffee-light/10 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground text-lg">Simple steps to get started</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-coffee text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="font-semibold mb-2">Login & Setup</h3>
              <p className="text-muted-foreground">Access your personalized dashboard with secure authentication</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-coffee text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="font-semibold mb-2">Process Orders</h3>
              <p className="text-muted-foreground">Take orders efficiently with our intuitive menu interface</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-coffee text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="font-semibold mb-2">Track & Analyze</h3>
              <p className="text-muted-foreground">Monitor sales and generate insights to grow your business</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-coffee to-brown rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Coffee Shop?
          </h2>
          <p className="text-coffee-light text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of successful coffee shops using Enzi POS to streamline their operations and boost revenue.
          </p>
          <Link to="/login">
            <Button size="lg" variant="secondary" className="bg-white text-coffee hover:bg-coffee-light px-8 py-6 text-lg">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-coffee-light/20 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 Enzi Coffee Shop POS. Crafted with ❤️ for coffee enthusiasts.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;