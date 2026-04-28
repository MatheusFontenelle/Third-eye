import { Test, TestingModule } from '@nestjs/testing';
import { AffiliatesService } from './affiliates.service';
import { CacheService } from '../common/cache/cache.service';
import { AffiliateProvider, AffiliateSearchParams } from './interfaces/affiliate-provider.interface';
import { ProductEntity } from '../products/entities/product.entity';

class MockProviderA implements AffiliateProvider {
  readonly name = 'ProviderA';
  async search(params: AffiliateSearchParams): Promise<ProductEntity[]> {
    return [
      {
        id: 'p1',
        name: 'Product A',
        brand: 'BrandA',
        category: 'CatA',
        image: '',
        specs: {},
        description: '',
        rating: 4.5,
        reviewsCount: 100,
        priceHistory: [],
        offers: [
          {
            id: 'o1',
            productId: 'p1',
            store: 'StoreA',
            storeRating: 4.5,
            storeReviewsCount: 100,
            price: 1000,
            shipping: 50,
            shippingTimeDays: 3,
            freeShipping: false,
            condition: 'new',
            url: 'https://example.com/a',
            inStock: true,
          },
        ],
      },
    ];
  }
}

class MockProviderB implements AffiliateProvider {
  readonly name = 'ProviderB';
  async search(params: AffiliateSearchParams): Promise<ProductEntity[]> {
    return [
      {
        id: 'p2',
        name: 'Product B',
        brand: 'BrandB',
        category: 'CatB',
        image: '',
        specs: {},
        description: '',
        rating: 4.0,
        reviewsCount: 50,
        priceHistory: [],
        offers: [
          {
            id: 'o2',
            productId: 'p2',
            store: 'StoreB',
            storeRating: 4.0,
            storeReviewsCount: 50,
            price: 800,
            shipping: 0,
            shippingTimeDays: 5,
            freeShipping: true,
            condition: 'new',
            url: 'https://example.com/b',
            inStock: true,
          },
        ],
      },
    ];
  }
}

class FailingProvider implements AffiliateProvider {
  readonly name = 'FailingProvider';
  async search(): Promise<ProductEntity[]> {
    throw new Error('Network error');
  }
}

describe('AffiliatesService', () => {
  let service: AffiliatesService;
  let cache: CacheService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AffiliatesService, CacheService],
    }).compile();

    service = module.get<AffiliatesService>(AffiliatesService);
    cache = module.get<CacheService>(CacheService);

    // Inject mock providers directly
    (service as any).providers = [new MockProviderA(), new MockProviderB()];
  });

  it('should aggregate results from multiple providers', async () => {
    const result = await service.search({ q: 'test', page: 1, pageSize: 20 });
    expect(result).toHaveLength(2);
  });

  it('should sort by total price ascending', async () => {
    const result = await service.search({ q: 'test', page: 1, pageSize: 20 });
    // Product B has total 800, Product A has total 1050
    expect(result[0].name).toBe('Product B');
    expect(result[1].name).toBe('Product A');
  });

  it('should cache results and return cached on second call', async () => {
    const params = { q: 'cache-test', page: 1, pageSize: 20 };

    const first = await service.search(params);
    expect(first).toHaveLength(2);

    // Change providers to return empty - cached result should still be returned
    (service as any).providers = [];
    const second = await service.search(params);
    expect(second).toHaveLength(2);
  });

  it('should handle provider failures gracefully (fail-soft)', async () => {
    (service as any).providers = [new MockProviderA(), new FailingProvider()];

    const result = await service.search({ q: 'fail-test', page: 1, pageSize: 20 });
    // Should get results from ProviderA despite FailingProvider error
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Product A');
  });

  it('should return empty array when all providers fail', async () => {
    (service as any).providers = [new FailingProvider()];

    const result = await service.search({ q: 'all-fail', page: 1, pageSize: 20 });
    expect(result).toEqual([]);
  });
});

