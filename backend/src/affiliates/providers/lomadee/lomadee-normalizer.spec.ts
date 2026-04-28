import { normalizeLomadeeProduct, normalizeLomadeeOffer } from './lomadee-normalizer';
import { LomadeeProduct, LomadeeOffer } from './lomadee.types';

describe('LomadeeNormalizer', () => {
  describe('normalizeLomadeeOffer', () => {
    it('should map a complete Lomadee offer to OfferEntity', () => {
      const lo: LomadeeOffer = {
        id: 'off-1',
        price: 2999.99,
        originalPrice: 3499.99,
        shipping: { price: 15.9, freeShipping: false, deliveryTime: '5 dias úteis' },
        store: { name: 'Kabum', rating: 4.7, reviewsCount: 12000 },
        link: 'https://kabum.com.br/produto/1',
        condition: 'new',
        inStock: true,
      };

      const result = normalizeLomadeeOffer(lo, 'prod-1');

      expect(result.id).toBe('off-1');
      expect(result.productId).toBe('prod-1');
      expect(result.price).toBe(2999.99);
      expect(result.originalPrice).toBe(3499.99);
      expect(result.shipping).toBe(15.9);
      expect(result.freeShipping).toBe(false);
      expect(result.shippingTimeDays).toBe(5);
      expect(result.store).toBe('Kabum');
      expect(result.storeRating).toBe(4.7);
      expect(result.storeReviewsCount).toBe(12000);
      expect(result.url).toBe('https://kabum.com.br/produto/1');
      expect(result.condition).toBe('new');
      expect(result.inStock).toBe(true);
    });

    it('should handle missing optional fields with defaults', () => {
      const lo: LomadeeOffer = {
        id: 'off-2',
        price: 1500,
      };

      const result = normalizeLomadeeOffer(lo, 'prod-2');

      expect(result.shipping).toBe(0);
      expect(result.freeShipping).toBe(true);
      expect(result.shippingTimeDays).toBe(5);
      expect(result.store).toBe('Loja');
      expect(result.storeRating).toBe(4.0);
      expect(result.condition).toBe('new');
      expect(result.url).toBe('');
    });
  });

  describe('normalizeLomadeeProduct', () => {
    it('should map a complete Lomadee product to ProductEntity', () => {
      const lp: LomadeeProduct = {
        id: 'prod-1',
        name: 'iPhone 15 Pro Max 256GB',
        shortName: 'iPhone 15 Pro Max',
        category: { name: 'Smartphones' },
        images: [{ medium: 'https://img.com/m.jpg', default: 'https://img.com/d.jpg' }],
        rating: { userAverageRating: { rating: 4.8, numRatings: 5000 } },
        specification: { 'Tela': '6.7"', 'Cor': 'Titanio' },
        offers: [
          {
            id: 'off-1',
            price: 8999,
            store: { name: 'Fast Shop' },
            link: 'https://fastshop.com.br/iphone',
          },
        ],
      };

      const result = normalizeLomadeeProduct(lp);

      expect(result.id).toBe('prod-1');
      expect(result.name).toBe('iPhone 15 Pro Max 256GB');
      expect(result.brand).toBe('Apple');
      expect(result.category).toBe('Smartphones');
      expect(result.image).toBe('https://img.com/m.jpg');
      expect(result.rating).toBe(4.8);
      expect(result.reviewsCount).toBe(5000);
      expect(result.specs).toEqual({ 'Tela': '6.7"', 'Cor': 'Titanio' });
      expect(result.offers).toHaveLength(1);
      expect(result.offers[0].store).toBe('Fast Shop');
    });

    it('should extract brand from product name', () => {
      const lp: LomadeeProduct = {
        id: 'prod-2',
        name: 'Samsung Galaxy S24 Ultra',
        offers: [],
      };

      const result = normalizeLomadeeProduct(lp);
      expect(result.brand).toBe('Samsung');
    });

    it('should fallback to Outros when brand is unknown', () => {
      const lp: LomadeeProduct = {
        id: 'prod-3',
        name: 'Produto Genérico XYZ',
        offers: [],
      };

      const result = normalizeLomadeeProduct(lp);
      expect(result.brand).toBe('Outros');
    });
  });
});

