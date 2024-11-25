import { cn } from "@/lib/utils";

interface RiskMeterProps {
  risk: number; // 0-100
  className?: string;
}

export const RiskMeter = ({ risk, className }: RiskMeterProps) => {
  const getRiskColor = (risk: number) => {
    if (risk < 30) return "bg-success";
    if (risk < 70) return "bg-yellow-500";
    return "bg-warning";
  };

  return (
    <div className={cn("w-full space-y-2", className)}>
      <div className="flex justify-between text-sm">
        <span>Low Risk</span>
        <span>High Risk</span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div
          className={cn("h-full transition-all duration-500", getRiskColor(risk))}
          style={{ width: `${risk}%` }}
        />
      </div>
    </div>
  );
};