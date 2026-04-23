import { ApiProperty } from '@nestjs/swagger';

class OfferResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  productId: string;

  @ApiProperty()
  store: string;

  @ApiProperty({ required: false })
  storeLogo?: string;

  @ApiProperty()
  storeRating: number;

  @ApiProperty()
  storeReviewsCount: number;

  @ApiProperty()
  price: number;

  @ApiProperty({ required: false })
  originalPrice?: number;

  @ApiProperty()
  shipping: number;

  @ApiProperty()
  shippingTimeDays: number;

  @ApiProperty()
  freeShipping: boolean;

  @ApiProperty({ enum: ['new', 'used', 'refurbished'] })
  condition: string;

  @ApiProperty()
  url: string;

  @ApiProperty()
  inStock: boolean;
}

class PriceHistoryPointDto {
  @ApiProperty()
  date: string;

  @ApiProperty()
  price: number;
}

export class ProductResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  brand: string;

  @ApiProperty()
  category: string;

  @ApiProperty()
  image: string;

  @ApiProperty({ type: [String], required: false })
  gallery?: string[];

  @ApiProperty({ type: 'object', additionalProperties: { type: 'string' } })
  specs: Record<string, string>;

  @ApiProperty()
  description: string;

  @ApiProperty()
  rating: number;

  @ApiProperty()
  reviewsCount: number;

  @ApiProperty({ type: [PriceHistoryPointDto] })
  priceHistory: PriceHistoryPointDto[];

  @ApiProperty({ type: [OfferResponseDto] })
  offers: OfferResponseDto[];
}

export class SearchResultDto {
  @ApiProperty({ type: [ProductResponseDto] })
  products: ProductResponseDto[];

  @ApiProperty()
  total: number;

  @ApiProperty()
  query: string;

  @ApiProperty()
  page: number;

  @ApiProperty()
  pageSize: number;
}
