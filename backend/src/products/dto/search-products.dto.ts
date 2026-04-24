import { IsOptional, IsString, IsNumber, IsBoolean, IsArray, IsEnum, Min, Max, MaxLength } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export enum SortOption {
  PRICE_ASC = 'price_asc',
  TOTAL_PRICE_ASC = 'total_price_asc',
  STORE_RATING_DESC = 'store_rating_desc',
  SHIPPING_TIME_ASC = 'shipping_time_asc',
}

export class SearchProductsDto {
  @ApiPropertyOptional({ description: 'Search query', default: '' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  q?: string = '';

  @ApiPropertyOptional({ description: 'Minimum price filter' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  minPrice?: number;

  @ApiPropertyOptional({ description: 'Maximum price filter' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  maxPrice?: number;

  @ApiPropertyOptional({ description: 'Filter by stores (accepts CSV or repeated)', type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => {
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') return value.split(',').map((s) => s.trim());
    return [];
  })
  stores?: string[];

  @ApiPropertyOptional({ description: 'Filter by conditions (new, used, refurbished)', type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => {
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') return value.split(',').map((s) => s.trim());
    return [];
  })
  conditions?: string[];

  @ApiPropertyOptional({ description: 'Maximum shipping time in days' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  maxShippingDays?: number;

  @ApiPropertyOptional({ description: 'Show only free shipping offers', default: false })
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  freeShippingOnly?: boolean = false;

  @ApiPropertyOptional({ description: 'Sort option', enum: SortOption, default: SortOption.PRICE_ASC })
  @IsOptional()
  @IsEnum(SortOption)
  sort?: SortOption = SortOption.PRICE_ASC;

  @ApiPropertyOptional({ description: 'Page number', default: 1, minimum: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ description: 'Page size', default: 20, maximum: 100 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  pageSize?: number = 20;
}
