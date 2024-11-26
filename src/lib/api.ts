import axios from 'axios';

const CMC_API_KEY = '05e67871-347e-4427-84da-45aa7b857c7e';
const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

const api = axios.create({
  baseURL: `${CORS_PROXY}https://pro-api.coinmarketcap.com/v1`,
  headers: {
    'X-CMC_PRO_API_KEY': CMC_API_KEY,
    'Accept': 'application/json',
    'Accept-Encoding': 'deflate, gzip'
  }
});

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

// Demo data for non-authenticated users
const DEMO_COINS: CoinData[] = [
  {
    name: "MoonCoin",
    symbol: "MOON",
    price: 0.00123,
    market_trend: "bullish",
    should_buy: true,
    trend_strength: 75,
    percent_change_24h: 12.5,
    market_cap: 1000000,
    volume_24h: 500000
  },
  {
    name: "StarToken",
    symbol: "STAR",
    price: 0.0456,
    market_trend: "bearish",
    should_buy: false,
    trend_strength: 60,
    percent_change_24h: -8.3,
    market_cap: 2000000,
    volume_24h: 750000
  },
  {
    name: "GalaxyCoin",
    symbol: "GLXY",
    price: 1.23,
    market_trend: "neutral",
    should_buy: true,
    trend_strength: 45,
    percent_change_24h: 2.1,
    market_cap: 5000000,
    volume_24h: 1200000
  }
];

export const fetchCoinPrice = async (symbol: string, isDemo: boolean = false): Promise<number> => {
  if (isDemo) {
    const demoCoin = DEMO_COINS.find(coin => coin.symbol === symbol);
    return demoCoin?.price || 0;
  }

  try {
    const response = await api.get('/cryptocurrency/quotes/latest', {
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

export const searchCoins = async (query: string, isDemo: boolean = false): Promise<CoinData[]> => {
  if (isDemo) {
    return DEMO_COINS.filter(coin => 
      coin.name?.toLowerCase().includes(query.toLowerCase()) ||
      coin.symbol?.toLowerCase().includes(query.toLowerCase())
    );
  }

  try {
    const response = await api.get('/cryptocurrency/listings/latest', {
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

export const analyzeTrends = async (symbol: string, isDemo: boolean = false): Promise<CoinData> => {
  if (isDemo) {
    const demoCoin = DEMO_COINS.find(coin => coin.symbol === symbol);
    return demoCoin || {
      price: 0,
      market_trend: "neutral",
      should_buy: false,
      trend_strength: 0
    };
  }

  try {
    const response = await api.get('/cryptocurrency/quotes/latest', {
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