import { Card } from "@/components/ui/card";
import { RiskMeter } from "./RiskMeter";

interface CoinAnalysisProps {
  name: string;
  symbol: string;
  price: number;
  risk: number;
  returnTime: string;
  recommendation: string;
}

export const CoinAnalysis = ({
  name,
  symbol,
  price,
  risk,
  returnTime,
  recommendation,
}: CoinAnalysisProps) => {
  return (
    <Card className="p-6 space-y-4 animate-fade-up">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-display font-bold">{name}</h3>
          <p className="text-sm text-muted-foreground">{symbol}</p>
        </div>
        <p className="text-xl font-bold">${price.toLocaleString()}</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-2">Risk Assessment</p>
          <RiskMeter risk={risk} />
        </div>
        
        <div>
          <p className="text-sm text-muted-foreground">Expected Return Time</p>
          <p className="text-lg font-semibold">{returnTime}</p>
        </div>
        
        <div>
          <p className="text-sm text-muted-foreground">Recommendation</p>
          <p className="text-lg font-semibold">{recommendation}</p>
        </div>
      </div>
    </Card>
  );
};