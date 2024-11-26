import { CoinAnalysis } from "@/components/CoinAnalysis";
import { ProfitCalculator } from "@/components/ProfitCalculator";
import { MemeCoinSection } from "@/components/MemeCoinSection";
import { SearchBar } from "@/components/SearchBar";
import { useQuery } from "@tanstack/react-query";
import { analyzeTrends } from "@/lib/api";
import { Loader2 } from "lucide-react";

const MAJOR_COINS = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    risk: 45,
    returnTime: "6-12 months",
    recommendation: "Strong Buy",
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    risk: 50,
    returnTime: "3-6 months",
    recommendation: "Buy",
  },
];

const Index = () => {
  const { data: coinData, isLoading } = useQuery({
    queryKey: ["majorCoins"],
    queryFn: async () => {
      const results = await Promise.all(
        MAJOR_COINS.map(async (coin) => ({
          ...coin,
          analysis: await analyzeTrends(coin.symbol),
        }))
      );
      return results;
    },
    refetchInterval: 60000, // Refresh every minute
  });

  return (
    <div className="min-h-screen bg-background">
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
          {isLoading ? (
            <div className="col-span-2 flex items-center justify-center p-12">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            coinData?.map((coin) => (
              <CoinAnalysis
                key={coin.symbol}
                name={coin.name}
                symbol={coin.symbol}
                price={coin.analysis.price}
                risk={coin.risk}
                returnTime={coin.returnTime}
                recommendation={coin.recommendation}
              />
            ))
          )}
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