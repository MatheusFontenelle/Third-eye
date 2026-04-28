/**
 * Types based on Lomadee (Buscape/Bondfaro) API v3 response structure.
 * When credentials are available, these map 1:1 to real API fields.
 */

export interface LomadeeProduct {
  id: string;
  name: string;
  shortName?: string;
  category?: { name: string };
  images?: { default?: string; medium?: string; large?: string }[];
  rating?: { userAverageRating?: { rating?: number; numRatings?: number } };
  specification?: Record<string, string>;
  offers?: LomadeeOffer[];
}

export interface LomadeeOffer {
  id: string;
  price: number;
  originalPrice?: number;
  shipping?: { price?: number; freeShipping?: boolean; deliveryTime?: string };
  store?: { name: string; logo?: string; rating?: number; reviewsCount?: number };
  link?: string;
  condition?: 'new' | 'used' | 'refurbished';
  inStock?: boolean;
}

export interface LomadeeSearchResponse {
  products?: LomadeeProduct[];
  totalResults?: number;
  page?: number;
  pageSize?: number;
}

