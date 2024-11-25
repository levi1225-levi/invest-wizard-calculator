import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RiskMeter } from "./RiskMeter";
import { analyzeTrends, type CoinData } from "@/lib/api";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

interface MemeCoin {
  name: string;
  symbol: string;
  risk: number;
  potential: string;
}

const MEME_COINS: MemeCoin[] = [
  {
    name: "Dogecoin",
    symbol: "DOGE",
    risk: 85,
    potential: "10x-100x",
  },
  {
    name: "Shiba Inu",
    symbol: "SHIB",
    risk: 90,
    potential: "50x-500x",
  },
];

export const MemeCoinSection = () => {
  const { data: marketData, isLoading } = useQuery({
    queryKey: ["memeCoins"],
    queryFn: async () => {
      const results = await Promise.all(
        MEME_COINS.map(async (coin) => ({
          ...coin,
          analysis: await analyzeTrends(coin.symbol),
        }))
      );
      return results;
    },
    refetchInterval: 60000, // Refresh every minute
  });

  const getBuyRecommendation = (analysis: CoinData) => {
    if (analysis.should_buy) {
      return (
        <Badge className="bg-green-500">
          Buy Now - Good Entry Point
        </Badge>
      );
    }
    return (
      <Badge variant="secondary">
        Wait for Better Entry
      </Badge>
    );
  };

  const getTrendBadge = (analysis: CoinData) => {
    const colors = {
      bullish: "bg-green-500",
      bearish: "bg-red-500",
      neutral: "bg-yellow-500",
    };

    return (
      <Badge className={colors[analysis.market_trend]}>
        {analysis.market_trend.toUpperCase()}
      </Badge>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex items-center gap-2">
        <h2 className="text-3xl font-display font-bold">Meme Coins</h2>
        <Badge variant="destructive">High Risk</Badge>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        {marketData?.map((coin) => (
          <Card key={coin.symbol} className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-display font-bold">{coin.name}</h3>
                <p className="text-sm text-muted-foreground">{coin.symbol}</p>
              </div>
              <p className="text-lg font-bold">
                ${coin.analysis.price.toFixed(6)}
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Risk Level</p>
                <RiskMeter risk={coin.risk} />
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Market Trend</p>
                <div className="flex gap-2 mt-1">
                  {getTrendBadge(coin.analysis)}
                  {getBuyRecommendation(coin.analysis)}
                </div>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Potential Return</p>
                <p className="text-lg font-semibold text-warning">{coin.potential}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <Alert>
        <AlertDescription>
          Market trends and buy signals are based on 24-hour price action and technical analysis.
          These are highly volatile assets - always do your own research and never invest more than
          you can afford to lose.
        </AlertDescription>
      </Alert>
    </div>
  );
};