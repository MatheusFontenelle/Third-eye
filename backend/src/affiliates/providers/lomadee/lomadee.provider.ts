import { Injectable, Logger } from '@nestjs/common';
import { AffiliateProvider, AffiliateSearchParams } from '../../interfaces/affiliate-provider.interface';
import { ProductEntity } from '../../../products/entities/product.entity';
import { LomadeeSearchResponse } from './lomadee.types';
import { normalizeLomadeeProduct } from './lomadee-normalizer';

const LOMADEE_BASE_URL = 'https://sandbox-api.lomadee.com';
const PROVIDER_TIMEOUT_MS = 5000;

function withTimeout(ms: number): AbortSignal {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), ms);
  return controller.signal;
}

type SearchReturn = ReturnType<AffiliateProvider['search']>;

@Injectable()
export class LomadeeProvider implements AffiliateProvider {
  readonly name = 'Lomadee';
  private readonly logger = new Logger(LomadeeProvider.name);
  private readonly appToken: string | undefined;
  private readonly sourceId: string | undefined;
  private readonly useMock: boolean;

  constructor() {
    this.appToken = process.env.LOMADEE_APP_TOKEN;
    this.sourceId = process.env.LOMADEE_SOURCE_ID;
    this.useMock = !this.appToken || process.env.LOMADEE_USE_MOCK === 'true';

    if (this.useMock) {
      this.logger.warn('LomadeeProvider running in MOCK mode (no credentials). Add LOMADEE_APP_TOKEN to use real API.');
    }
  }

  async search(params: AffiliateSearchParams): SearchReturn {
    if (this.useMock) {
      return this.mockSearch(params);
    }

    const url = this.buildSearchUrl(params);

    try {
      const response = await fetch(url, { signal: withTimeout(PROVIDER_TIMEOUT_MS) });

      if (!response.ok) {
        this.logger.error(`Lomadee API error: ${response.status} ${response.statusText}`);
        return [];
      }

      const data = (await response.json()) as LomadeeSearchResponse;
      return (data.products ?? []).map(normalizeLomadeeProduct);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      this.logger.error(`Lomadee provider failed: ${message}`);
      return [];
    }
  }

  private buildSearchUrl(params: AffiliateSearchParams): string {
    const qs = new URLSearchParams();
    qs.set('keyword', params.q);
    qs.set('page', String(params.page));
    qs.set('size', String(params.pageSize));
    if (params.minPrice !== undefined) qs.set('minPrice', String(params.minPrice));
    if (params.maxPrice !== undefined) qs.set('maxPrice', String(params.maxPrice));
    if (params.sort) qs.set('sort', params.sort);

    return `${LOMADEE_BASE_URL}/v3/${this.appToken}/offer/_search?${qs.toString()}&sourceId=${this.sourceId}`;
  }

  private mockSearch(params: AffiliateSearchParams): ProductEntity[] {
    const basePrice = 100 + (params.q.length * 50);
    const stores = ['Kabum', 'Pichau', 'Terabyte Shop', 'Mercado Livre', 'Amazon'];

    const mockProducts: ProductEntity[] = Array.from({ length: Math.min(params.pageSize, 5) }).map((_, i) => {
      const productId = `lomadee-mock-${params.q}-${i}`;
      const price = basePrice + i * 150 + Math.floor(Math.random() * 100);
      const originalPrice = price + Math.floor(Math.random() * 300);

      return {
        id: productId,
        name: `${params.q} - Oferta ${i + 1}`,
        brand: 'Genérico',
        category: 'Eletrônicos',
        image: 'https://http2.mlstatic.com/D_NQ_NP_649338-MLA74781074109_022024-O.webp',
        specs: { 'Modelo': params.q, 'Garantia': '12 meses' },
        description: `Produto encontrado via Lomadee para "${params.q}"`,
        rating: 4.2 + Math.random() * 0.6,
        reviewsCount: Math.floor(100 + Math.random() * 2000),
        priceHistory: [],
        offers: stores.map((store, sIdx) => ({
          id: `offer-${productId}-${sIdx}`,
          productId,
          store,
          storeRating: 4.0 + Math.random() * 0.9,
          storeReviewsCount: Math.floor(500 + Math.random() * 50000),
          price: price + sIdx * 20 - 10,
          originalPrice,
          shipping: sIdx % 2 === 0 ? 0 : 15 + sIdx * 5,
          shippingTimeDays: 2 + sIdx * 2,
          freeShipping: sIdx % 2 === 0,
          condition: 'new',
          url: `https://www.google.com/search?q=${encodeURIComponent(params.q + ' ' + store)}`,
          inStock: true,
        })),
      };
    });

    return mockProducts;
  }
}

