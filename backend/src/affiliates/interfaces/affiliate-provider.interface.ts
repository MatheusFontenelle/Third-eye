import { ProductEntity } from '../../products/entities/product.entity';

export interface AffiliateSearchParams {
  q: string;
  page: number;
  pageSize: number;
  sort?: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface AffiliateProvider {
  readonly name: string;
  search(params: AffiliateSearchParams): Promise<ProductEntity[]>;
}

