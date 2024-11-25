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
    // Get historical data for trend analysis
    const response = await fetch(
      `${COINBASE_API_BASE}/prices/${symbol}-USD/historic?period=day`
    );
    const data = await response.json();
    
    // Simple trend analysis based on last 24h
    const prices = data.data.prices;
    const latestPrice = prices[prices.length - 1].price;
    const dayAgoPrice = prices[0].price;
    const priceChange = ((latestPrice - dayAgoPrice) / dayAgoPrice) * 100;
    
    const trend: CoinData = {
      price: latestPrice,
      market_trend: priceChange > 5 ? "bullish" : priceChange < -5 ? "bearish" : "neutral",
      should_buy: priceChange < -10, // Basic buy signal on significant dips
      trend_strength: Math.abs(priceChange),
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