import axios from 'axios';

const CMC_API_KEY = 'YOUR_COINMARKETCAP_API_KEY'; // Note: This should be in an env variable
const CMC_API_BASE = 'https://pro-api.coinmarketcap.com/v1';

export interface CoinData {
  price: number;
  market_trend: "bullish" | "bearish" | "neutral";
  should_buy: boolean;
  trend_strength: number;
  name?: string;
  symbol?: string;
  percent_change_24h?: number;
  market_cap?: number;
  volume_24h?: number;
}

export const fetchCoinPrice = async (symbol: string): Promise<number> => {
  try {
    const response = await axios.get(`${CMC_API_BASE}/cryptocurrency/quotes/latest`, {
      headers: {
        'X-CMC_PRO_API_KEY': CMC_API_KEY,
      },
      params: {
        symbol: symbol,
        convert: 'USD'
      }
    });
    return response.data.data[symbol].quote.USD.price;
  } catch (error) {
    console.error("Error fetching price:", error);
    return 0;
  }
};

export const searchCoins = async (query: string): Promise<CoinData[]> => {
  try {
    const response = await axios.get(`${CMC_API_BASE}/cryptocurrency/listings/latest`, {
      headers: {
        'X-CMC_PRO_API_KEY': CMC_API_KEY,
      },
      params: {
        start: 1,
        limit: 100,
        convert: 'USD',
        sort: 'market_cap',
        sort_dir: 'desc',
        search: query
      }
    });

    return response.data.data.map((coin: any) => ({
      name: coin.name,
      symbol: coin.symbol,
      price: coin.quote.USD.price,
      market_trend: coin.quote.USD.percent_change_24h > 5 ? "bullish" : 
                   coin.quote.USD.percent_change_24h < -5 ? "bearish" : "neutral",
      should_buy: coin.quote.USD.percent_change_24h < -10,
      trend_strength: Math.abs(coin.quote.USD.percent_change_24h),
      percent_change_24h: coin.quote.USD.percent_change_24h,
      market_cap: coin.quote.USD.market_cap,
      volume_24h: coin.quote.USD.volume_24h
    }));
  } catch (error) {
    console.error("Error searching coins:", error);
    return [];
  }
};

export const analyzeTrends = async (symbol: string): Promise<CoinData> => {
  try {
    const response = await axios.get(`${CMC_API_BASE}/cryptocurrency/quotes/latest`, {
      headers: {
        'X-CMC_PRO_API_KEY': CMC_API_KEY,
      },
      params: {
        symbol: symbol,
        convert: 'USD'
      }
    });

    const coinData = response.data.data[symbol];
    const quote = coinData.quote.USD;

    return {
      price: quote.price,
      market_trend: quote.percent_change_24h > 5 ? "bullish" : 
                   quote.percent_change_24h < -5 ? "bearish" : "neutral",
      should_buy: quote.percent_change_24h < -10,
      trend_strength: Math.abs(quote.percent_change_24h),
      percent_change_24h: quote.percent_change_24h,
      market_cap: quote.market_cap,
      volume_24h: quote.volume_24h
    };
  } catch (error) {
    console.error("Error analyzing trends:", error);
    return {
      price: 0,
      market_trend: "neutral",
      should_buy: false,
      trend_strength: 0
    };
  }
};