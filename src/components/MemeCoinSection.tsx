import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RiskMeter } from "./RiskMeter";

interface MemeCoin {
  name: string;
  symbol: string;
  price: number;
  risk: number;
  potential: string;
}

const MEME_COINS: MemeCoin[] = [
  {
    name: "Dogecoin",
    symbol: "DOGE",
    price: 0.08,
    risk: 85,
    potential: "10x-100x",
  },
  {
    name: "Shiba Inu",
    symbol: "SHIB",
    price: 0.000008,
    risk: 90,
    potential: "50x-500x",
  },
];

export const MemeCoinSection = () => {
  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex items-center gap-2">
        <h2 className="text-3xl font-display font-bold">Meme Coins</h2>
        <Badge variant="destructive">High Risk</Badge>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        {MEME_COINS.map((coin) => (
          <Card key={coin.symbol} className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-display font-bold">{coin.name}</h3>
                <p className="text-sm text-muted-foreground">{coin.symbol}</p>
              </div>
              <p className="text-lg font-bold">${coin.price}</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Risk Level</p>
                <RiskMeter risk={coin.risk} />
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Potential Return</p>
                <p className="text-lg font-semibold text-warning">{coin.potential}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
        <p className="text-sm text-warning">
          Warning: Meme coins are extremely volatile and speculative investments.
          Never invest more than you can afford to lose.
        </p>
      </div>
    </div>
  );
};