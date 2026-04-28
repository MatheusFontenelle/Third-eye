import { ProductEntity, OfferEntity } from '../../../products/entities/product.entity';
import { LomadeeProduct, LomadeeOffer } from './lomadee.types';

export function normalizeLomadeeProduct(lp: LomadeeProduct): ProductEntity {
  const image =
    lp.images?.[0]?.medium ??
    lp.images?.[0]?.default ??
    lp.images?.[0]?.large ??
    '';

  const rating = lp.rating?.userAverageRating?.rating ?? 0;
  const reviewsCount = lp.rating?.userAverageRating?.numRatings ?? 0;

  const offers: OfferEntity[] = (lp.offers ?? []).map((lo: LomadeeOffer) =>
    normalizeLomadeeOffer(lo, lp.id),
  );

  return {
    id: lp.id,
    name: lp.name,
    brand: extractBrand(lp.name),
    category: lp.category?.name ?? 'Geral',
    image,
    specs: lp.specification ?? {},
    description: lp.shortName ?? lp.name,
    rating,
    reviewsCount,
    priceHistory: [],
    offers,
  };
}

export function normalizeLomadeeOffer(lo: LomadeeOffer, productId: string): OfferEntity {
  const shippingPrice = lo.shipping?.price ?? 0;
  const freeShipping = lo.shipping?.freeShipping ?? shippingPrice === 0;

  let shippingTimeDays = 5;
  if (lo.shipping?.deliveryTime) {
    const match = lo.shipping.deliveryTime.match(/(\d+)/);
    if (match) shippingTimeDays = parseInt(match[1], 10);
  }

  return {
    id: lo.id,
    productId,
    store: lo.store?.name ?? 'Loja',
    storeLogo: lo.store?.logo,
    storeRating: lo.store?.rating ?? 4.0,
    storeReviewsCount: lo.store?.reviewsCount ?? 0,
    price: lo.price,
    originalPrice: lo.originalPrice,
    shipping: freeShipping ? 0 : shippingPrice,
    shippingTimeDays,
    freeShipping,
    condition: lo.condition ?? 'new',
    url: lo.link ?? '',
    inStock: lo.inStock ?? true,
  };
}

function extractBrand(name: string): string {
  const upper = name.toUpperCase();

  // Direct brand name matches
  const knownBrands = [
    'Apple', 'Samsung', 'Xiaomi', 'Motorola', 'Sony', 'LG', 'Dell', 'Lenovo',
    'ASUS', 'Acer', 'HP', 'Microsoft', 'NVIDIA', 'AMD', 'Intel', 'Kingston',
    'Corsair', 'HyperX', 'Logitech', 'Razer', 'Redragon', 'JBL', 'Bose',
    'Philips', 'Panasonic', 'Canon', 'Nikon', 'GoPro', 'DJI', 'Amazon',
    'Google', 'OnePlus', 'Realme', 'Huawei', 'Nokia', 'Multilaser',
  ];
  for (const brand of knownBrands) {
    if (upper.includes(brand.toUpperCase())) return brand;
  }

  // Product family → brand inference
  const familyBrands: [string[], string][] = [
    [['IPHONE', 'IPAD', 'MACBOOK', 'IMAC', 'APPLE WATCH', 'AIRPODS'], 'Apple'],
    [['GALAXY', 'SAMSUNG'], 'Samsung'],
    [['REDMI', 'POCO', 'XIAOMI'], 'Xiaomi'],
    [['MOTO ', 'MOTOE', 'MOTOG', 'MOTOC', 'MOTOROLA'], 'Motorola'],
    [['PLAYSTATION', 'PS5', 'PS4'], 'Sony'],
    [['IDEAPAD', 'THINKPAD', 'LEGION', 'YOGA'], 'Lenovo'],
    [['PAVILION', 'OMEN', 'ELITEBOOK', 'SPECTRE', 'PROBOOK'], 'HP'],
    [['INSPIRON', 'XPS', 'LATITUDE', 'ALIENWARE', 'PRECISION'], 'Dell'],
    [['PREDATOR', 'ASPIRE', 'SWIFT', 'TRAVELMATE'], 'Acer'],
    [['VIVOBOOK', 'ZENBOOK', 'ROG', 'TUF'], 'ASUS'],
    [['SURFACE'], 'Microsoft'],
    [['GEFORCE', 'RTX'], 'NVIDIA'],
    [['RYZEN', 'RADEON'], 'AMD'],
    [['CORE I3', 'CORE I5', 'CORE I7', 'CORE I9', 'PENTIUM', 'CELERON'], 'Intel'],
    [['PIXEL'], 'Google'],
    [['KINDLE', 'ECHO', 'FIRE TV'], 'Amazon'],
  ];
  for (const [families, brand] of familyBrands) {
    for (const family of families) {
      if (upper.includes(family)) return brand;
    }
  }

  return 'Outros';
}

