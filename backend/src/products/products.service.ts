import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SearchProductsDto, SortOption } from './dto/search-products.dto';
import { ProductEntity, OfferEntity, PriceHistoryPointEntity } from './entities/product.entity';
import { SearchResultDto } from './dto/product-response.dto';
import { AffiliatesService } from '../affiliates/affiliates.service';

@Injectable()
export class ProductsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly affiliatesService: AffiliatesService,
  ) {}

  async search(dto: SearchProductsDto): Promise<SearchResultDto> {
    const affiliatesEnabled = process.env.AFFILIATES_ENABLED === 'true';
    const useMock = process.env.USE_MOCK === 'true';

    if (affiliatesEnabled && !useMock) {
      return this.searchAffiliates(dto);
    }

    return this.searchDatabase(dto);
  }

  private async searchAffiliates(dto: SearchProductsDto): Promise<SearchResultDto> {
    const affiliateProducts = await this.affiliatesService.search({
      q: dto.q ?? '',
      page: dto.page ?? 1,
      pageSize: dto.pageSize ?? 20,
      sort: dto.sort,
      minPrice: dto.minPrice,
      maxPrice: dto.maxPrice,
    });

    let products = affiliateProducts;

    // Apply offer-level filters
    if (dto.stores && dto.stores.length > 0) {
      products = products.map((p) => ({
        ...p,
        offers: p.offers.filter((o) => dto.stores!.includes(o.store)),
      }));
    }

    if (dto.conditions && dto.conditions.length > 0) {
      products = products.map((p) => ({
        ...p,
        offers: p.offers.filter((o) => dto.conditions!.includes(o.condition)),
      }));
    }

    if (dto.maxShippingDays !== undefined) {
      products = products.map((p) => ({
        ...p,
        offers: p.offers.filter((o) => o.shippingTimeDays <= dto.maxShippingDays!),
      }));
    }

    if (dto.freeShippingOnly) {
      products = products.map((p) => ({
        ...p,
        offers: p.offers.filter((o) => o.freeShipping),
      }));
    }

    // Filter out products with zero offers after filtering
    products = products.filter((p) => p.offers.length > 0);

    // Apply price filters at product level (best offer)
    if (dto.minPrice !== undefined) {
      products = products.filter((p) => p.offers[0] && p.offers[0].price >= dto.minPrice!);
    }
    if (dto.maxPrice !== undefined) {
      products = products.filter((p) => p.offers[0] && p.offers[0].price <= dto.maxPrice!);
    }

    // Apply brand filters
    if (dto.brands && dto.brands.length > 0) {
      products = products.filter((p) => dto.brands!.includes(p.brand));
    }

    // Sort offers within each product
    products = products.map((product) => {
      const sortedOffers = [...product.offers].sort((a, b) => {
        switch (dto.sort) {
          case SortOption.PRICE_ASC:
            return a.price - b.price;
          case SortOption.TOTAL_PRICE_ASC:
            return a.price + a.shipping - (b.price + b.shipping);
          case SortOption.STORE_RATING_DESC:
            return b.storeRating - a.storeRating;
          case SortOption.SHIPPING_TIME_ASC:
            return a.shippingTimeDays - b.shippingTimeDays;
          default:
            return a.price - b.price;
        }
      });
      return { ...product, offers: sortedOffers };
    });

    // Sort products by best offer
    products.sort((a, b) => {
      const aBest = a.offers[0];
      const bBest = b.offers[0];
      if (!aBest) return 1;
      if (!bBest) return -1;

      switch (dto.sort) {
        case SortOption.PRICE_ASC:
          return aBest.price - bBest.price;
        case SortOption.TOTAL_PRICE_ASC:
          return aBest.price + aBest.shipping - (bBest.price + bBest.shipping);
        case SortOption.STORE_RATING_DESC:
          return bBest.storeRating - aBest.storeRating;
        case SortOption.SHIPPING_TIME_ASC:
          return aBest.shippingTimeDays - bBest.shippingTimeDays;
        default:
          return aBest.price - bBest.price;
      }
    });

    const total = products.length;
    const skip = ((dto.page ?? 1) - 1) * (dto.pageSize ?? 20);
    const paginatedProducts = products.slice(skip, skip + (dto.pageSize ?? 20));

    return {
      products: paginatedProducts,
      total,
      query: dto.q ?? '',
      page: dto.page ?? 1,
      pageSize: dto.pageSize ?? 20,
    };
  }

  private async searchDatabase(dto: SearchProductsDto): Promise<SearchResultDto> {
    const {
      q = '',
      minPrice,
      maxPrice,
      brands,
      stores,
      conditions,
      maxShippingDays,
      freeShippingOnly = false,
      sort = SortOption.PRICE_ASC,
      page = 1,
      pageSize = 20,
    } = dto;

    // Build offer-level where clause
    const offerWhere: any = {};

    if (minPrice !== undefined) {
      offerWhere.price = { ...offerWhere.price, gte: minPrice };
    }
    if (maxPrice !== undefined) {
      offerWhere.price = { ...offerWhere.price, lte: maxPrice };
    }
    if (stores && stores.length > 0) {
      offerWhere.store = { name: { in: stores } };
    }
    if (conditions && conditions.length > 0) {
      offerWhere.condition = { in: conditions };
    }
    if (maxShippingDays !== undefined) {
      offerWhere.shippingTimeDays = { lte: maxShippingDays };
    }
    if (freeShippingOnly) {
      offerWhere.freeShipping = true;
    }

    // Build product-level where clause
    const productWhere: any = {};
    if (q && q.trim().length > 0) {
      const query = q.trim();
      productWhere.OR = [
        { name: { contains: query, mode: 'insensitive' } },
        { brand: { contains: query, mode: 'insensitive' } },
        { category: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
      ];
    }
    if (brands && brands.length > 0) {
      productWhere.brand = { in: brands };
    }

    // Fetch products with filtered offers
    const productsRaw = await this.prisma.product.findMany({
      where: productWhere,
      include: {
        offers: {
          where: Object.keys(offerWhere).length > 0 ? offerWhere : undefined,
          include: { store: true },
        },
        priceHistory: {
          orderBy: { date: 'asc' },
        },
      },
    });

    // Filter out products with zero offers after filtering
    let products = productsRaw.filter((p) => p.offers.length > 0);

    // Sort offers within each product
    products = products.map((product) => {
      const sortedOffers = [...product.offers].sort((a, b) => {
        switch (sort) {
          case SortOption.PRICE_ASC:
            return a.price - b.price;
          case SortOption.TOTAL_PRICE_ASC:
            return a.price + a.shipping - (b.price + b.shipping);
          case SortOption.STORE_RATING_DESC:
            return b.store.rating - a.store.rating;
          case SortOption.SHIPPING_TIME_ASC:
            return a.shippingTimeDays - b.shippingTimeDays;
          default:
            return a.price - b.price;
        }
      });
      return { ...product, offers: sortedOffers };
    });

    // Sort products by "best offer" (first offer after sorting)
    products.sort((a, b) => {
      const aBest = a.offers[0];
      const bBest = b.offers[0];
      if (!aBest) return 1;
      if (!bBest) return -1;

      switch (sort) {
        case SortOption.PRICE_ASC:
          return aBest.price - bBest.price;
        case SortOption.TOTAL_PRICE_ASC:
          return aBest.price + aBest.shipping - (bBest.price + bBest.shipping);
        case SortOption.STORE_RATING_DESC:
          return bBest.store.rating - aBest.store.rating;
        case SortOption.SHIPPING_TIME_ASC:
          return aBest.shippingTimeDays - bBest.shippingTimeDays;
        default:
          return aBest.price - bBest.price;
      }
    });

    const total = products.length;

    // Pagination
    const skip = (page - 1) * pageSize;
    const paginatedProducts = products.slice(skip, skip + pageSize);

    return {
      products: paginatedProducts.map((p) => this.mapToProductEntity(p)),
      total,
      query: q,
      page,
      pageSize,
    };
  }

  async findById(id: string): Promise<ProductEntity> {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        offers: {
          include: { store: true },
        },
        priceHistory: {
          orderBy: { date: 'asc' },
        },
      },
    });

    if (!product) {
      throw new NotFoundException({
        message: `Product with id '${id}' not found`,
        code: 'NOT_FOUND',
      });
    }

    return this.mapToProductEntity(product);
  }

  private mapToProductEntity(product: any): ProductEntity {
    return {
      id: product.id,
      name: product.name,
      brand: product.brand,
      category: product.category,
      image: product.image,
      gallery: product.gallery ?? undefined,
      specs: (product.specs as Record<string, string>) ?? {},
      description: product.description,
      rating: product.rating,
      reviewsCount: product.reviewsCount,
      priceHistory: product.priceHistory.map(
        (ph: any): PriceHistoryPointEntity => ({
          date: ph.date.toISOString().split('T')[0],
          price: ph.price,
        }),
      ),
      offers: product.offers.map(
        (o: any): OfferEntity => ({
          id: o.id,
          productId: o.productId,
          store: o.store.name,
          storeLogo: o.store.logo ?? undefined,
          storeRating: o.store.rating,
          storeReviewsCount: o.store.reviewsCount,
          price: o.price,
          originalPrice: o.originalPrice ?? undefined,
          shipping: o.shipping,
          shippingTimeDays: o.shippingTimeDays,
          freeShipping: o.freeShipping,
          condition: o.condition,
          url: o.url,
          inStock: o.inStock,
        }),
      ),
    };
  }
}
