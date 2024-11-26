import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4">
        <nav className="h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold">CryptoTracker Pro</h1>
          <div className="space-x-4">
            <Button variant="ghost" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link to="/demo">Try Demo</Link>
            </Button>
          </div>
        </nav>

        <main className="py-24 space-y-24">
          <section className="text-center space-y-6 animate-fade-up">
            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight">
              Professional Crypto
              <br />
              Trading Platform
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Access real-time market data, advanced analytics, and powerful trading tools
              to make informed decisions in the cryptocurrency market.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link to="/demo">Try Demo</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/login">Login</Link>
              </Button>
            </div>
          </section>

          <section className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-secondary/50 rounded-2xl backdrop-blur-md">
              <h3 className="text-xl font-bold mb-2">Real-time Data</h3>
              <p className="text-muted-foreground">
                Access live cryptocurrency prices and market data from trusted sources.
              </p>
            </div>
            <div className="p-6 bg-secondary/50 rounded-2xl backdrop-blur-md">
              <h3 className="text-xl font-bold mb-2">Advanced Analytics</h3>
              <p className="text-muted-foreground">
                Get detailed market analysis and trading signals to inform your decisions.
              </p>
            </div>
            <div className="p-6 bg-secondary/50 rounded-2xl backdrop-blur-md">
              <h3 className="text-xl font-bold mb-2">Portfolio Tracking</h3>
              <p className="text-muted-foreground">
                Monitor your investments and track your trading performance over time.
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Landing;