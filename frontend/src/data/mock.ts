import { Product, SearchResult } from '@/types';

const today = new Date().toISOString().split('T')[0];
const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

export const mockProducts: Product[] = [
  {
    id: 'rtx-4060',
    name: 'Placa de Vídeo NVIDIA GeForce RTX 4060 8GB GDDR6',
    brand: 'NVIDIA',
    category: 'Placas de Vídeo',
    image: 'https://via.placeholder.com/400x300?text=RTX+4060',
    gallery: [
      'https://via.placeholder.com/800x600?text=RTX+4060+Front',
      'https://via.placeholder.com/800x600?text=RTX+4060+Back',
      'https://via.placeholder.com/800x600?text=RTX+4060+Ports',
    ],
    specs: {
      'Memória': '8GB GDDR6',
      'Interface': 'PCIe 4.0 x16',
      'Clock Base': '1830 MHz',
      'Clock Boost': '2460 MHz',
      'Consumo': '115W',
      'Conectores': '1x HDMI 2.1, 3x DisplayPort 1.4a',
    },
    description:
      'A GeForce RTX 4060 é alimentada pela arquitetura Ada Lovelace, oferecendo desempenho excepcional para jogos em 1080p e 1440p com ray tracing e DLSS 3.',
    rating: 4.7,
    reviewsCount: 1243,
    priceHistory: [
      { date: monthAgo, price: 2899 },
      { date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], price: 2799 },
      { date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], price: 2599 },
      { date: today, price: 2499 },
    ],
    offers: [
      {
        id: 'o1',
        productId: 'rtx-4060',
        store: 'Kabum',
        storeRating: 4.5,
        storeReviewsCount: 52000,
        price: 2499,
        originalPrice: 2899,
        shipping: 0,
        shippingTimeDays: 5,
        freeShipping: true,
        condition: 'new',
        url: '#',
        inStock: true,
      },
      {
        id: 'o2',
        productId: 'rtx-4060',
        store: 'Terabyte Shop',
        storeRating: 4.8,
        storeReviewsCount: 31000,
        price: 2450,
        shipping: 15,
        shippingTimeDays: 4,
        freeShipping: false,
        condition: 'new',
        url: '#',
        inStock: true,
      },
      {
        id: 'o3',
        productId: 'rtx-4060',
        store: 'Pichau',
        storeRating: 4.6,
        storeReviewsCount: 28000,
        price: 2599,
        originalPrice: 2799,
        shipping: 0,
        shippingTimeDays: 3,
        freeShipping: true,
        condition: 'new',
        url: '#',
        inStock: true,
      },
      {
        id: 'o4',
        productId: 'rtx-4060',
        store: 'Amazon Brasil',
        storeRating: 4.9,
        storeReviewsCount: 120000,
        price: 2520,
        shipping: 12,
        shippingTimeDays: 2,
        freeShipping: false,
        condition: 'new',
        url: '#',
        inStock: true,
      },
    ],
  },
  {
    id: 'iphone-15',
    name: 'Apple iPhone 15 128GB',
    brand: 'Apple',
    category: 'Smartphones',
    image: 'https://via.placeholder.com/400x300?text=iPhone+15',
    gallery: [
      'https://via.placeholder.com/800x600?text=iPhone+15+Front',
      'https://via.placeholder.com/800x600?text=iPhone+15+Back',
    ],
    specs: {
      'Tela': '6.1" OLED Super Retina XDR',
      'Processador': 'A16 Bionic',
      'Armazenamento': '128GB',
      'Câmera Principal': '48MP',
      'Câmera Frontal': '12MP',
      'Bateria': '3349 mAh',
    },
    description:
      'O iPhone 15 traz tela OLED Super Retina XDR de 6.1", chip A16 Bionic, câmera principal de 48MP e conector USB-C.',
    rating: 4.8,
    reviewsCount: 8560,
    priceHistory: [
      { date: monthAgo, price: 7299 },
      { date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], price: 6999 },
      { date: today, price: 6799 },
    ],
    offers: [
      {
        id: 'o5',
        productId: 'iphone-15',
        store: 'Magazine Luiza',
        storeRating: 4.4,
        storeReviewsCount: 89000,
        price: 6799,
        originalPrice: 7599,
        shipping: 0,
        shippingTimeDays: 7,
        freeShipping: true,
        condition: 'new',
        url: '#',
        inStock: true,
      },
      {
        id: 'o6',
        productId: 'iphone-15',
        store: 'Fast Shop',
        storeRating: 4.7,
        storeReviewsCount: 15000,
        price: 6899,
        shipping: 0,
        shippingTimeDays: 3,
        freeShipping: true,
        condition: 'new',
        url: '#',
        inStock: true,
      },
      {
        id: 'o7',
        productId: 'iphone-15',
        store: 'Amazon Brasil',
        storeRating: 4.9,
        storeReviewsCount: 120000,
        price: 6750,
        shipping: 20,
        shippingTimeDays: 2,
        freeShipping: false,
        condition: 'new',
        url: '#',
        inStock: true,
      },
    ],
  },
  {
    id: 'ssd-1tb-nvme',
    name: 'SSD 1TB NVMe M.2 Kingston KC3000',
    brand: 'Kingston',
    category: 'Armazenamento',
    image: 'https://via.placeholder.com/400x300?text=SSD+1TB',
    specs: {
      'Capacidade': '1TB',
      'Interface': 'PCIe 4.0 NVMe',
      'Leitura Seq.': '7000 MB/s',
      'Escrita Seq.': '6000 MB/s',
      'Formato': 'M.2 2280',
      'Duração': '800 TBW',
    },
    description:
      'SSD NVMe de alta performance com velocidades de leitura de até 7000 MB/s, ideal para jogos e aplicações profissionais.',
    rating: 4.6,
    reviewsCount: 3420,
    priceHistory: [
      { date: monthAgo, price: 699 },
      { date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], price: 599 },
      { date: today, price: 549 },
    ],
    offers: [
      {
        id: 'o8',
        productId: 'ssd-1tb-nvme',
        store: 'Terabyte Shop',
        storeRating: 4.8,
        storeReviewsCount: 31000,
        price: 549,
        originalPrice: 699,
        shipping: 12,
        shippingTimeDays: 4,
        freeShipping: false,
        condition: 'new',
        url: '#',
        inStock: true,
      },
      {
        id: 'o9',
        productId: 'ssd-1tb-nvme',
        store: 'Kabum',
        storeRating: 4.5,
        storeReviewsCount: 52000,
        price: 569,
        shipping: 0,
        shippingTimeDays: 5,
        freeShipping: true,
        condition: 'new',
        url: '#',
        inStock: true,
      },
    ],
  },
  {
    id: 'ryzen-7-7800x3d',
    name: 'Processador AMD Ryzen 7 7800X3D',
    brand: 'AMD',
    category: 'Processadores',
    image: 'https://via.placeholder.com/400x300?text=Ryzen+7+7800X3D',
    specs: {
      'Núcleos': '8',
      'Threads': '16',
      'Clock Base': '4.2 GHz',
      'Clock Boost': '5.0 GHz',
      'Cache': '96MB L3 (3D V-Cache)',
      'TDP': '120W',
      'Socket': 'AM5',
    },
    description:
      'O processador gamer mais rápido do mundo com tecnologia 3D V-Cache, ideal para jogos de alta performance.',
    rating: 4.9,
    reviewsCount: 2100,
    priceHistory: [
      { date: monthAgo, price: 3299 },
      { date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], price: 2899 },
      { date: today, price: 2799 },
    ],
    offers: [
      {
        id: 'o10',
        productId: 'ryzen-7-7800x3d',
        store: 'Pichau',
        storeRating: 4.6,
        storeReviewsCount: 28000,
        price: 2799,
        originalPrice: 3499,
        shipping: 0,
        shippingTimeDays: 3,
        freeShipping: true,
        condition: 'new',
        url: '#',
        inStock: true,
      },
      {
        id: 'o11',
        productId: 'ryzen-7-7800x3d',
        store: 'Terabyte Shop',
        storeRating: 4.8,
        storeReviewsCount: 31000,
        price: 2850,
        shipping: 15,
        shippingTimeDays: 4,
        freeShipping: false,
        condition: 'new',
        url: '#',
        inStock: true,
      },
    ],
  },
  {
    id: 'monitor-27-4k',
    name: 'Monitor 27" 4K UHD LG UltraFine',
    brand: 'LG',
    category: 'Monitores',
    image: 'https://via.placeholder.com/400x300?text=Monitor+27+4K',
    specs: {
      'Tamanho': '27 polegadas',
      'Resolução': '3840 x 2160 (4K UHD)',
      'Painel': 'IPS',
      'Taxa Atualização': '60Hz',
      'Tempo Resposta': '5ms',
      'Cobertura de Cor': '99% sRGB',
    },
    description:
      'Monitor profissional 4K com painel IPS, cores precisas e design ergonômico para produtividade e criação de conteúdo.',
    rating: 4.5,
    reviewsCount: 980,
    priceHistory: [
      { date: monthAgo, price: 2899 },
      { date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], price: 2599 },
      { date: today, price: 2399 },
    ],
    offers: [
      {
        id: 'o12',
        productId: 'monitor-27-4k',
        store: 'Kabum',
        storeRating: 4.5,
        storeReviewsCount: 52000,
        price: 2399,
        originalPrice: 2899,
        shipping: 45,
        shippingTimeDays: 7,
        freeShipping: false,
        condition: 'new',
        url: '#',
        inStock: true,
      },
      {
        id: 'o13',
        productId: 'monitor-27-4k',
        store: 'Magazine Luiza',
        storeRating: 4.4,
        storeReviewsCount: 89000,
        price: 2499,
        shipping: 0,
        shippingTimeDays: 8,
        freeShipping: true,
        condition: 'new',
        url: '#',
        inStock: true,
      },
    ],
  },
  {
    id: 'macbook-air-m3',
    name: 'MacBook Air 13" M3 8GB RAM 256GB SSD',
    brand: 'Apple',
    category: 'Notebooks',
    image: 'https://via.placeholder.com/400x300?text=MacBook+Air+M3',
    specs: {
      'Processador': 'Apple M3',
      'RAM': '8GB Unified Memory',
      'Armazenamento': '256GB SSD',
      'Tela': '13.6" Liquid Retina',
      'Bateria': 'Até 18 horas',
      'Peso': '1.24 kg',
    },
    description:
      'O MacBook Air com chip M3 é incrivelmente fino e rápido, com bateria para o dia todo e tela Liquid Retina.',
    rating: 4.8,
    reviewsCount: 5400,
    priceHistory: [
      { date: monthAgo, price: 11299 },
      { date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], price: 10499 },
      { date: today, price: 9999 },
    ],
    offers: [
      {
        id: 'o14',
        productId: 'macbook-air-m3',
        store: 'Fast Shop',
        storeRating: 4.7,
        storeReviewsCount: 15000,
        price: 9999,
        originalPrice: 11999,
        shipping: 0,
        shippingTimeDays: 4,
        freeShipping: true,
        condition: 'new',
        url: '#',
        inStock: true,
      },
      {
        id: 'o15',
        productId: 'macbook-air-m3',
        store: 'Amazon Brasil',
        storeRating: 4.9,
        storeReviewsCount: 120000,
        price: 10299,
        shipping: 0,
        shippingTimeDays: 3,
        freeShipping: true,
        condition: 'new',
        url: '#',
        inStock: true,
      },
    ],
  },
];

export function mockSearch(q: string): SearchResult {
  const query = q.toLowerCase().trim();
  const filtered = query
    ? mockProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.specs['Memória']?.toLowerCase().includes(query) ||
          p.specs['Armazenamento']?.toLowerCase().includes(query)
      )
    : [...mockProducts];

  return {
    products: filtered,
    total: filtered.length,
    query: q,
  };
}

export function mockGetProduct(id: string): Product | undefined {
  return mockProducts.find((p) => p.id === id);
}

export function getBrands(): string[] {
  return [...new Set(mockProducts.map((p) => p.brand))].sort();
}

export function getStores(): string[] {
  return [...new Set(mockProducts.flatMap((p) => p.offers.map((o) => o.store)))].sort();
}

