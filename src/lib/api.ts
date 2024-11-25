const COINBASE_API_BASE = "https://api.coinbase.com/v2";

export interface CoinData {
  price: number;
  market_trend: "bullish" | "bearish" | "neutral";
  should_buy: boolean;
  trend_strength: number;
}

export const fetchCoinPrice = async (symbol: string): Promise<number> => {
  try {
    const response = await fetch(
      `${COINBASE_API_BASE}/prices/${symbol}-USD/spot`
    );
    const data = await response.json();
    return parseFloat(data.data.amount);
  } catch (error) {
    console.error("Error fetching price:", error);
    return 0;
  }
};

export const analyzeTrends = async (symbol: string): Promise<CoinData> => {
  try {
    const price = await fetchCoinPrice(symbol);
    
    // Simplified trend analysis for demo
    const trend: CoinData = {
      price: Number(price) || 0, // Ensure price is a number
      market_trend: "neutral",
      should_buy: false,
      trend_strength: 0,
    };
    
    return trend;
  } catch (error) {
    console.error("Error analyzing trends:", error);
    return {
      price: 0,
      market_trend: "neutral",
      should_buy: false,
      trend_strength: 0,
    };
  }
};