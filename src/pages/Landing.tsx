import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6">
          <h1 className="text-5xl font-bold font-display">
            Crypto Investment Analysis Platform
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Make informed cryptocurrency trading decisions with real-time market data,
            advanced analytics, and expert insights.
          </p>
          <div className="space-x-4">
            <Button onClick={() => navigate("/login")} size="lg">
              Login
            </Button>
            <Button
              onClick={() => navigate("/dashboard")}
              variant="outline"
              size="lg"
            >
              View Demo
            </Button>
          </div>
        </div>

        <div className="mt-24 grid gap-12 md:grid-cols-3">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold">Real-time Data</h3>
            <p className="text-muted-foreground">
              Access live cryptocurrency prices and market data from trusted sources
            </p>
          </div>
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold">Advanced Analytics</h3>
            <p className="text-muted-foreground">
              Get detailed market analysis and trading recommendations
            </p>
          </div>
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold">Expert Insights</h3>
            <p className="text-muted-foreground">
              Learn from market trends and make informed trading decisions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;