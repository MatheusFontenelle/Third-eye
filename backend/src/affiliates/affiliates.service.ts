import { Injectable, Logger } from '@nestjs/common';
import { AffiliateProvider, AffiliateSearchParams } from './interfaces/affiliate-provider.interface';
import { ProductEntity } from '../products/entities/product.entity';
import { CacheService } from '../common/cache/cache.service';
import { LomadeeProvider } from './providers/lomadee/lomadee.provider';

const CACHE_TTL_MS = 60_000; // 60 seconds

function buildCacheKey(params: AffiliateSearchParams): string {
  return `aff:${params.q}:${params.page}:${params.pageSize}:${params.sort ?? ''}:${params.minPrice ?? ''}:${params.maxPrice ?? ''}`;
}

@Injectable()
export class AffiliatesService {
  private readonly logger = new Logger(AffiliatesService.name);
  private readonly providers: AffiliateProvider[];

  constructor(private readonly cache: CacheService) {
    this.providers = [new LomadeeProvider()];
  }

  async search(params: AffiliateSearchParams): Promise<ProductEntity[]> {
    const cacheKey = buildCacheKey(params);
    const cached = this.cache.get<ProductEntity[]>(cacheKey);
    if (cached) {
      this.logger.debug(`Cache hit for key: ${cacheKey}`);
      return cached;
    }

    this.logger.debug(`Cache miss for key: ${cacheKey}`);

    const results = await this.queryProviders(params);

    this.cache.set(cacheKey, results, CACHE_TTL_MS);
    return results;
  }

  private async queryProviders(params: AffiliateSearchParams): Promise<ProductEntity[]> {
    const settled = await Promise.allSettled(
      this.providers.map((p) => this.queryProvider(p, params)),
    );

    const products: ProductEntity[] = [];

    for (let i = 0; i < settled.length; i++) {
      const result = settled[i];
      const providerName = this.providers[i].name;

      if (result.status === 'fulfilled') {
        products.push(...result.value);
      } else {
        this.logger.error(`Provider ${providerName} failed: ${String(result.reason)}`);
      }
    }

    return this.sortByBestPrice(products);
  }

  private async queryProvider(
    provider: AffiliateProvider,
    params: AffiliateSearchParams,
  ): Promise<ProductEntity[]> {
    try {
      return await provider.search(params);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      this.logger.error(`Unexpected error from ${provider.name}: ${message}`);
      return [];
    }
  }

  private sortByBestPrice(products: ProductEntity[]): ProductEntity[] {
    return products.sort((a, b) => {
      const aBest = a.offers[0];
      const bBest = b.offers[0];
      if (!aBest) return 1;
      if (!bBest) return -1;
      return aBest.price + aBest.shipping - (bBest.price + bBest.shipping);
    });
  }
}

