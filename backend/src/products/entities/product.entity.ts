export interface OfferEntity {
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
  condition: string;
  url: string;
  inStock: boolean;
}

export interface PriceHistoryPointEntity {
  date: string;
  price: number;
}

export interface ProductEntity {
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
  priceHistory: PriceHistoryPointEntity[];
  offers: OfferEntity[];
}
