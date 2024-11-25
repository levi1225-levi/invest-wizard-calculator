import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchCoins } from "@/lib/api";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RiskMeter } from "./RiskMeter";
import { Loader2 } from "lucide-react";

export const SearchBar = () => {
  const [search, setSearch] = useState("");
  
  const { data: searchResults, isLoading } = useQuery({
    queryKey: ['searchCoins', search],
    queryFn: () => searchCoins(search),
    enabled: search.length > 2,
  });

  const getTrendBadge = (trend: string) => {
    const colors = {
      bullish: "bg-green-500",
      bearish: "bg-red-500",
      neutral: "bg-yellow-500",
    };

    return (
      <Badge className={colors[trend as keyof typeof colors]}>
        {trend.toUpperCase()}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-display font-bold">Search Coins</h2>
        <Input
          placeholder="Search for any cryptocurrency..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xl"
        />
      </div>

      {isLoading && search.length > 2 && (
        <div className="flex items-center justify-center p-12">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      )}

      {searchResults && searchResults.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2">
          {searchResults.map((coin) => (
            <Card key={coin.symbol} className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-display font-bold">{coin.name}</h3>
                  <p className="text-sm text-muted-foreground">{coin.symbol}</p>
                </div>
                <p className="text-lg font-bold">
                  ${typeof coin.price === 'number' ? coin.price.toFixed(6) : '0.000000'}
                </p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Risk Level</p>
                  <RiskMeter risk={Math.min(Math.abs(coin.percent_change_24h || 0) * 2, 100)} />
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Market Trend</p>
                  <div className="flex gap-2 mt-1">
                    {getTrendBadge(coin.market_trend)}
                    <Badge variant={coin.should_buy ? "default" : "secondary"}>
                      {coin.should_buy ? "Buy Now" : "Wait"}
                    </Badge>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">24h Change</p>
                  <p className={`text-lg font-semibold ${(coin.percent_change_24h || 0) > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {coin.percent_change_24h?.toFixed(2)}%
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};