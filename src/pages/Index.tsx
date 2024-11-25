import { CoinAnalysis } from "@/components/CoinAnalysis";
import { ProfitCalculator } from "@/components/ProfitCalculator";
import { MemeCoinSection } from "@/components/MemeCoinSection";
import { SearchBar } from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

const SAMPLE_COINS = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    price: 43000,
    risk: 45,
    returnTime: "6-12 months",
    recommendation: "Strong Buy",
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    price: 2200,
    risk: 50,
    returnTime: "3-6 months",
    recommendation: "Buy",
  },
];

const Index = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("isAdmin");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="container py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Crypto Analysis</h1>
        <Button variant="ghost" onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </header>
      <main className="container py-12 space-y-12">
        <div className="text-center space-y-4 animate-fade-up">
          <h1 className="text-4xl md:text-5xl font-display font-bold">
            Crypto Investment Analysis
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Make informed decisions with our advanced analysis tools and real-time
            market insights.
          </p>
        </div>

        <SearchBar />

        <div className="grid gap-6 md:grid-cols-2">
          {SAMPLE_COINS.map((coin) => (
            <CoinAnalysis key={coin.symbol} {...coin} />
          ))}
        </div>

        <div className="max-w-xl mx-auto">
          <ProfitCalculator />
        </div>

        <MemeCoinSection />
      </main>
    </div>
  );
};

export default Index;