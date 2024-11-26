import { SearchBar } from "@/components/SearchBar";
import { MemeCoinSection } from "@/components/MemeCoinSection";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Demo = () => {
  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed w-full bg-background/80 backdrop-blur-md z-50 border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold">CryptoTracker Pro</h1>
          <div className="space-x-4">
            <Button variant="ghost" asChild>
              <Link to="/">Home</Link>
            </Button>
            <Button asChild>
              <Link to="/login">Login</Link>
            </Button>
          </div>
        </div>
      </nav>

      <main className="container py-24 space-y-12">
        <div className="text-center space-y-4 animate-fade-up">
          <h1 className="text-4xl md:text-5xl font-display font-bold">
            Demo Mode
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            This is a demo version with sample data. Log in to access real-time market data.
          </p>
        </div>

        <SearchBar isDemo={true} />
        <MemeCoinSection isDemo={true} />

        <div className="text-center pt-12">
          <Button size="lg" asChild>
            <Link to="/login">Access Full Platform</Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Demo;