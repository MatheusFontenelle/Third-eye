export interface Offer {
  id: string;
  productId: string;
  store: string;
  storeLogo?: string;
  storeRating: number;
  storeReviewsCount: number;
  price: number;
  originalPrice?: number;
  shipping: number;
  shippingTimeDays: number;
  freeShipping: boolean;
  condition: 'new' | 'used' | 'refurbished';
  url: string;
  inStock: boolean;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  image: string;
  gallery?: string[];
  specs: Record<string, string>;
  description: string;
  rating: number;
  reviewsCount: number;
  priceHistory: PriceHistoryPoint[];
  offers: Offer[];
}

export interface PriceHistoryPoint {
  date: string;
  price: number;
}

export interface SearchFilters {
  minPrice?: number;
  maxPrice?: number;
  brands: string[];
  stores: string[];
  conditions: ('new' | 'used' | 'refurbished')[];
  maxShippingDays?: number;
  freeShippingOnly: boolean;
}

export type SortOption =
  | 'price_asc'
  | 'total_price_asc'
  | 'store_rating_desc'
  | 'shipping_time_asc';

export interface SearchResult {
  products: Product[];
  total: number;
  query: string;
}

export interface SearchState {
  query: string;
  filters: SearchFilters;
  sort: SortOption;
  page: number;
}

