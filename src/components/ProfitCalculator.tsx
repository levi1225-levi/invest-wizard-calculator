import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const ProfitCalculator = () => {
  const [investment, setInvestment] = useState("");
  const [months, setMonths] = useState("");
  const [expectedReturn, setExpectedReturn] = useState<number | null>(null);

  const calculateReturn = () => {
    const amount = parseFloat(investment);
    const period = parseFloat(months);
    
    if (isNaN(amount) || isNaN(period)) return;
    
    // Simple calculation for demo purposes
    const monthlyReturn = 0.05; // 5% monthly return
    const totalReturn = amount * Math.pow(1 + monthlyReturn, period);
    setExpectedReturn(totalReturn);
  };

  return (
    <Card className="p-6 space-y-4 animate-fade-up">
      <h3 className="text-2xl font-display font-bold">Profit Calculator</h3>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="investment">Investment Amount (USD)</Label>
          <Input
            id="investment"
            type="number"
            value={investment}
            onChange={(e) => setInvestment(e.target.value)}
            placeholder="1000"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="months">Time Period (Months)</Label>
          <Input
            id="months"
            type="number"
            value={months}
            onChange={(e) => setMonths(e.target.value)}
            placeholder="12"
          />
        </div>
        <Button onClick={calculateReturn} className="w-full">
          Calculate Potential Returns
        </Button>
        {expectedReturn !== null && (
          <div className="mt-4 p-4 bg-secondary rounded-lg">
            <p className="text-sm text-muted-foreground">Estimated Return:</p>
            <p className="text-2xl font-bold text-success">
              ${expectedReturn.toFixed(2)}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};