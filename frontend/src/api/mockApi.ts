import { Product, SearchResult, SearchFilters, SortOption } from '@/types';
import { mockSearch, mockGetProduct } from '@/data/mock';

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function searchProducts(
  q: string,
  filters: SearchFilters,
  sort: SortOption
): Promise<SearchResult> {
  await sleep(600);

  const result = mockSearch(q);

  // Apply filters to offers within products for search results display
  let products = result.products.map((p) => {
    let offers = p.offers.filter((o) => {
      if (filters.minPrice !== undefined && o.price < filters.minPrice) return false;
      if (filters.maxPrice !== undefined && o.price > filters.maxPrice) return false;
      if (filters.stores.length > 0 && !filters.stores.includes(o.store)) return false;
      if (filters.conditions.length > 0 && !filters.conditions.includes(o.condition)) return false;
      if (filters.maxShippingDays !== undefined && o.shippingTimeDays > filters.maxShippingDays)
        return false;
      if (filters.freeShippingOnly && !o.freeShipping) return false;
      return true;
    });

    return { ...p, offers };
  });

  // Only keep products that have at least one offer after filtering
  products = products.filter((p) => p.offers.length > 0);

  // Sort offers within each product based on selected sort
  products = products.map((p) => {
    const sortedOffers = [...p.offers].sort((a, b) => {
      switch (sort) {
        case 'price_asc':
          return a.price - b.price;
        case 'total_price_asc':
          return a.price + a.shipping - (b.price + b.shipping);
        case 'store_rating_desc':
          return b.storeRating - a.storeRating;
        case 'shipping_time_asc':
          return a.shippingTimeDays - b.shippingTimeDays;
        default:
          return 0;
      }
    });
    return { ...p, offers: sortedOffers };
  });

  // Sort products by their best offer according to sort
  products = products.sort((a, b) => {
    const offerA = a.offers[0];
    const offerB = b.offers[0];
    if (!offerA || !offerB) return 0;

    switch (sort) {
      case 'price_asc':
        return offerA.price - offerB.price;
      case 'total_price_asc':
        return offerA.price + offerA.shipping - (offerB.price + offerB.shipping);
      case 'store_rating_desc':
        return offerB.storeRating - offerA.storeRating;
      case 'shipping_time_asc':
        return offerA.shippingTimeDays - offerB.shippingTimeDays;
      default:
        return 0;
    }
  });

  return {
    products,
    total: products.length,
    query: q,
  };
}

export async function getProduct(id: string): Promise<Product | null> {
  await sleep(400);
  const product = mockGetProduct(id);
  return product ?? null;
}

