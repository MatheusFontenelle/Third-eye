import { Product, SearchResult } from '@/types';
import { generateProductUrl } from '@/utils/storeUrls';

// ─── Constants & Types ───────────────────────────────────────────────────────

const today = new Date().toISOString().split('T')[0];
const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

interface StoreConfig {
  name: string;
  rating: number;
  reviews: number;
  priceMul: number;
  shipping: number;
  days: number;
}

interface GpuModel {
  id: string;
  name: string;
  vram: string;
  tdp: string;
  tier: number;
}

const COMMON_STORES: StoreConfig[] = [
  { name: 'Kabum', rating: 4.5, reviews: 52000, priceMul: 1.0, shipping: 0, days: 5 },
  { name: 'Pichau', rating: 4.6, reviews: 28000, priceMul: 1.02, shipping: 0, days: 3 },
  { name: 'Terabyte Shop', rating: 4.8, reviews: 31000, priceMul: 0.98, shipping: 15, days: 4 },
  { name: 'Mercado Livre', rating: 4.7, reviews: 200000, priceMul: 1.01, shipping: 0, days: 2 },
  { name: 'AliExpress', rating: 4.2, reviews: 100000, priceMul: 0.9, shipping: 0, days: 14 },
  { name: 'Amazon', rating: 4.8, reviews: 500000, priceMul: 0.99, shipping: 0, days: 2 },
];

const NVIDIA_IMAGES: Record<string, string> = {
  Pascal: 'https://http2.mlstatic.com/D_NQ_NP_649338-MLA74781074109_022024-O.webp',
  Turing: 'https://http2.mlstatic.com/D_NQ_NP_787475-MLU74198718098_012024-O.webp',
  Ampere: 'https://http2.mlstatic.com/D_NQ_NP_902156-MLU74198718094_012024-O.webp',
  'Ada Lovelace': 'https://http2.mlstatic.com/D_NQ_NP_973786-MLU74198718092_012024-O.webp',
  Blackwell: 'https://http2.mlstatic.com/D_NQ_NP_839338-MLA74781074109_022024-O.webp',
};

const AMD_IMAGE = 'https://http2.mlstatic.com/D_NQ_NP_649338-MLA74781074109_022024-O.webp';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function generateOffers(
  stores: StoreConfig[],
  basePrice: number,
  productId: string,
  productName: string,
  startCounter: number
) {
  let counter = startCounter;

  return stores.map((s) => {
    const price = Math.floor(basePrice * s.priceMul);
    counter++;
    return {
      id: `o${counter}`,
      productId,
      store: s.name,
      storeRating: s.rating,
      storeReviewsCount: s.reviews,
      price,
      originalPrice: price > basePrice ? price : basePrice + Math.floor(Math.random() * 300),
      shipping: s.shipping,
      shippingTimeDays: s.days,
      freeShipping: s.shipping === 0,
      condition: 'new' as const,
      url: generateProductUrl(s.name, productId, productName),
      inStock: true,
    };
  });
}

function generatePriceHistory(basePrice: number, points = 3) {
  const history = [];
  const step = Math.floor(30 / (points - 1 || 1));

  for (let i = points - 1; i >= 0; i--) {
    const daysAgo = i * step;
    history.push({
      date: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      price: basePrice + Math.floor(Math.random() * (i * 100 + 50)),
    });
  }
  return history;
}

// ─── GPU Datasets ────────────────────────────────────────────────────────────

const RX_MODELS: GpuModel[] = [
  { id: 'rx-580-8gb', name: 'AMD Radeon RX 580 8GB', vram: '8GB GDDR5', tdp: '185W', tier: 1 },
  { id: 'rx-590-8gb', name: 'AMD Radeon RX 590 8GB', vram: '8GB GDDR5', tdp: '225W', tier: 1 },
  { id: 'rx-5500-4gb', name: 'AMD Radeon RX 5500 4GB', vram: '4GB GDDR6', tdp: '150W', tier: 2 },
  { id: 'rx-5500-xt-4gb', name: 'AMD Radeon RX 5500 XT 4GB', vram: '4GB GDDR6', tdp: '130W', tier: 2 },
  { id: 'rx-5500-xt-8gb', name: 'AMD Radeon RX 5500 XT 8GB', vram: '8GB GDDR6', tdp: '130W', tier: 2 },
  { id: 'rx-5600-6gb', name: 'AMD Radeon RX 5600 6GB', vram: '6GB GDDR6', tdp: '150W', tier: 3 },
  { id: 'rx-5600-xt-6gb', name: 'AMD Radeon RX 5600 XT 6GB', vram: '6GB GDDR6', tdp: '160W', tier: 3 },
  { id: 'rx-5700-8gb', name: 'AMD Radeon RX 5700 8GB', vram: '8GB GDDR6', tdp: '180W', tier: 4 },
  { id: 'rx-5700-xt-8gb', name: 'AMD Radeon RX 5700 XT 8GB', vram: '8GB GDDR6', tdp: '225W', tier: 4 },
  { id: 'rx-6400-4gb', name: 'AMD Radeon RX 6400 4GB', vram: '4GB GDDR6', tdp: '53W', tier: 5 },
  { id: 'rx-6500-xt-4gb', name: 'AMD Radeon RX 6500 XT 4GB', vram: '4GB GDDR6', tdp: '107W', tier: 5 },
  { id: 'rx-6600-8gb', name: 'AMD Radeon RX 6600 8GB', vram: '8GB GDDR6', tdp: '132W', tier: 6 },
  { id: 'rx-6600-xt-8gb', name: 'AMD Radeon RX 6600 XT 8GB', vram: '8GB GDDR6', tdp: '160W', tier: 6 },
  { id: 'rx-6650-xt-8gb', name: 'AMD Radeon RX 6650 XT 8GB', vram: '8GB GDDR6', tdp: '180W', tier: 6 },
  { id: 'rx-6700-xt-12gb', name: 'AMD Radeon RX 6700 XT 12GB', vram: '12GB GDDR6', tdp: '230W', tier: 7 },
  { id: 'rx-6750-xt-12gb', name: 'AMD Radeon RX 6750 XT 12GB', vram: '12GB GDDR6', tdp: '250W', tier: 7 },
  { id: 'rx-6800-16gb', name: 'AMD Radeon RX 6800 16GB', vram: '16GB GDDR6', tdp: '250W', tier: 8 },
  { id: 'rx-6800-xt-16gb', name: 'AMD Radeon RX 6800 XT 16GB', vram: '16GB GDDR6', tdp: '300W', tier: 8 },
  { id: 'rx-6900-xt-16gb', name: 'AMD Radeon RX 6900 XT 16GB', vram: '16GB GDDR6', tdp: '300W', tier: 9 },
  { id: 'rx-6950-xt-16gb', name: 'AMD Radeon RX 6950 XT 16GB', vram: '16GB GDDR6', tdp: '335W', tier: 9 },
  { id: 'rx-7600-8gb', name: 'AMD Radeon RX 7600 8GB', vram: '8GB GDDR6', tdp: '165W', tier: 10 },
  { id: 'rx-7600-xt-16gb', name: 'AMD Radeon RX 7600 XT 16GB', vram: '16GB GDDR6', tdp: '190W', tier: 10 },
  { id: 'rx-7700-xt-12gb', name: 'AMD Radeon RX 7700 XT 12GB', vram: '12GB GDDR6', tdp: '245W', tier: 11 },
  { id: 'rx-7800-xt-16gb', name: 'AMD Radeon RX 7800 XT 16GB', vram: '16GB GDDR6', tdp: '263W', tier: 11 },
  { id: 'rx-7900-gre-16gb', name: 'AMD Radeon RX 7900 GRE 16GB', vram: '16GB GDDR6', tdp: '260W', tier: 12 },
  { id: 'rx-7900-xt-20gb', name: 'AMD Radeon RX 7900 XT 20GB', vram: '20GB GDDR6', tdp: '300W', tier: 12 },
  { id: 'rx-7900-xtx-24gb', name: 'AMD Radeon RX 7900 XTX 24GB', vram: '24GB GDDR6', tdp: '355W', tier: 13 },
  { id: 'rx-9060-xt-8gb', name: 'AMD Radeon RX 9060 XT 8GB', vram: '8GB GDDR6', tdp: '150W', tier: 14 },
  { id: 'rx-9060-xt-16gb', name: 'AMD Radeon RX 9060 XT 16GB', vram: '16GB GDDR6', tdp: '150W', tier: 14 },
  { id: 'rx-9070-16gb', name: 'AMD Radeon RX 9070 16GB', vram: '16GB GDDR6', tdp: '220W', tier: 15 },
  { id: 'rx-9070-xt-16gb', name: 'AMD Radeon RX 9070 XT 16GB', vram: '16GB GDDR6', tdp: '304W', tier: 15 },
];

const NVIDIA_MODELS: GpuModel[] = [
  { id: 'gtx-1660-6gb', name: 'NVIDIA GeForce GTX 1660 6GB', vram: '6GB GDDR5', tdp: '120W', tier: 1 },
  { id: 'gtx-1660-super', name: 'NVIDIA GeForce GTX 1660 Super', vram: '6GB GDDR6', tdp: '125W', tier: 2 },
  { id: 'gtx-1660-ti-6gb', name: 'NVIDIA GeForce GTX 1660 Ti 6GB', vram: '6GB GDDR6', tdp: '120W', tier: 2 },
  { id: 'gtx-1070-8gb', name: 'NVIDIA GeForce GTX 1070 8GB', vram: '8GB GDDR5', tdp: '150W', tier: 3 },
  { id: 'gtx-1070-ti-8gb', name: 'NVIDIA GeForce GTX 1070 Ti 8GB', vram: '8GB GDDR5', tdp: '180W', tier: 4 },
  { id: 'gtx-1080-8gb', name: 'NVIDIA GeForce GTX 1080 8GB', vram: '8GB GDDR5X', tdp: '180W', tier: 5 },
  { id: 'gtx-1080-ti-11gb', name: 'NVIDIA GeForce GTX 1080 Ti 11GB', vram: '11GB GDDR5X', tdp: '250W', tier: 6 },
  { id: 'rtx-2060-6gb', name: 'NVIDIA GeForce RTX 2060 6GB', vram: '6GB GDDR6', tdp: '160W', tier: 7 },
  { id: 'rtx-2060-12gb', name: 'NVIDIA GeForce RTX 2060 12GB', vram: '12GB GDDR6', tdp: '185W', tier: 7 },
  { id: 'rtx-2060-super-8gb', name: 'NVIDIA GeForce RTX 2060 SUPER 8GB', vram: '8GB GDDR6', tdp: '175W', tier: 8 },
  { id: 'rtx-2070-8gb', name: 'NVIDIA GeForce RTX 2070 8GB', vram: '8GB GDDR6', tdp: '175W', tier: 9 },
  { id: 'rtx-2070-super-8gb', name: 'NVIDIA GeForce RTX 2070 SUPER 8GB', vram: '8GB GDDR6', tdp: '215W', tier: 10 },
  { id: 'rtx-2080-8gb', name: 'NVIDIA GeForce RTX 2080 8GB', vram: '8GB GDDR6', tdp: '215W', tier: 11 },
  { id: 'rtx-2080-super-8gb', name: 'NVIDIA GeForce RTX 2080 SUPER 8GB', vram: '8GB GDDR6', tdp: '250W', tier: 12 },
  { id: 'rtx-2080-ti-11gb', name: 'NVIDIA GeForce RTX 2080 Ti 11GB', vram: '11GB GDDR6', tdp: '260W', tier: 13 },
  { id: 'rtx-3050-8gb', name: 'NVIDIA GeForce RTX 3050 8GB', vram: '8GB GDDR6', tdp: '130W', tier: 14 },
  { id: 'rtx-3060-8gb', name: 'NVIDIA GeForce RTX 3060 8GB', vram: '8GB GDDR6', tdp: '170W', tier: 15 },
  { id: 'rtx-3060-12gb', name: 'NVIDIA GeForce RTX 3060 12GB', vram: '12GB GDDR6', tdp: '170W', tier: 15 },
  { id: 'rtx-3060-ti-8gb', name: 'NVIDIA GeForce RTX 3060 Ti 8GB', vram: '8GB GDDR6', tdp: '200W', tier: 16 },
  { id: 'rtx-3070-8gb', name: 'NVIDIA GeForce RTX 3070 8GB', vram: '8GB GDDR6', tdp: '220W', tier: 17 },
  { id: 'rtx-3070-ti-8gb', name: 'NVIDIA GeForce RTX 3070 Ti 8GB', vram: '8GB GDDR6X', tdp: '290W', tier: 18 },
  { id: 'rtx-3080-10gb', name: 'NVIDIA GeForce RTX 3080 10GB', vram: '10GB GDDR6X', tdp: '320W', tier: 19 },
  { id: 'rtx-3080-12gb', name: 'NVIDIA GeForce RTX 3080 12GB', vram: '12GB GDDR6X', tdp: '350W', tier: 20 },
  { id: 'rtx-3080-ti-12gb', name: 'NVIDIA GeForce RTX 3080 Ti 12GB', vram: '12GB GDDR6X', tdp: '350W', tier: 21 },
  { id: 'rtx-3090-24gb', name: 'NVIDIA GeForce RTX 3090 24GB', vram: '24GB GDDR6X', tdp: '350W', tier: 22 },
  { id: 'rtx-3090-ti-24gb', name: 'NVIDIA GeForce RTX 3090 Ti 24GB', vram: '24GB GDDR6X', tdp: '450W', tier: 23 },
  { id: 'rtx-4060-8gb', name: 'NVIDIA GeForce RTX 4060 8GB', vram: '8GB GDDR6', tdp: '115W', tier: 24 },
  { id: 'rtx-4060-ti-8gb', name: 'NVIDIA GeForce RTX 4060 Ti 8GB', vram: '8GB GDDR6', tdp: '160W', tier: 25 },
  { id: 'rtx-4060-ti-16gb', name: 'NVIDIA GeForce RTX 4060 Ti 16GB', vram: '16GB GDDR6', tdp: '165W', tier: 25 },
  { id: 'rtx-4070-12gb', name: 'NVIDIA GeForce RTX 4070 12GB', vram: '12GB GDDR6X', tdp: '200W', tier: 26 },
  { id: 'rtx-4070-super-12gb', name: 'NVIDIA GeForce RTX 4070 SUPER 12GB', vram: '12GB GDDR6X', tdp: '220W', tier: 27 },
  { id: 'rtx-4070-ti-12gb', name: 'NVIDIA GeForce RTX 4070 Ti 12GB', vram: '12GB GDDR6X', tdp: '285W', tier: 28 },
  { id: 'rtx-4070-ti-super-16gb', name: 'NVIDIA GeForce RTX 4070 Ti SUPER 16GB', vram: '16GB GDDR6X', tdp: '285W', tier: 29 },
  { id: 'rtx-4080-16gb', name: 'NVIDIA GeForce RTX 4080 16GB', vram: '16GB GDDR6X', tdp: '320W', tier: 30 },
  { id: 'rtx-4080-super-16gb', name: 'NVIDIA GeForce RTX 4080 SUPER 16GB', vram: '16GB GDDR6X', tdp: '320W', tier: 31 },
  { id: 'rtx-4090-24gb', name: 'NVIDIA GeForce RTX 4090 24GB', vram: '24GB GDDR6X', tdp: '450W', tier: 32 },
  { id: 'rtx-5050-8gb', name: 'NVIDIA GeForce RTX 5050 8GB', vram: '8GB GDDR6', tdp: '130W', tier: 33 },
  { id: 'rtx-5060-8gb', name: 'NVIDIA GeForce RTX 5060 8GB', vram: '8GB GDDR6', tdp: '150W', tier: 34 },
  { id: 'rtx-5060-ti-8gb', name: 'NVIDIA GeForce RTX 5060 Ti 8GB', vram: '8GB GDDR6', tdp: '180W', tier: 35 },
  { id: 'rtx-5060-ti-16gb', name: 'NVIDIA GeForce RTX 5060 Ti 16GB', vram: '16GB GDDR6', tdp: '180W', tier: 35 },
  { id: 'rtx-5070-12gb', name: 'NVIDIA GeForce RTX 5070 12GB', vram: '12GB GDDR6', tdp: '250W', tier: 36 },
  { id: 'rtx-5070-ti-16gb', name: 'NVIDIA GeForce RTX 5070 Ti 16GB', vram: '16GB GDDR6', tdp: '300W', tier: 37 },
  { id: 'rtx-5080-16gb', name: 'NVIDIA GeForce RTX 5080 16GB', vram: '16GB GDDR6', tdp: '360W', tier: 38 },
  { id: 'rtx-5090-32gb', name: 'NVIDIA GeForce RTX 5090 32GB', vram: '32GB GDDR6', tdp: '575W', tier: 39 },
];

// ─── Architecture Helpers ────────────────────────────────────────────────────

function getAmdArchitecture(tier: number): string {
  if (tier >= 14) return 'RDNA 4';
  if (tier >= 10) return 'RDNA 3';
  if (tier >= 5) return 'RDNA 2';
  return 'RDNA';
}

function getNvidiaArchitecture(tier: number): string {
  if (tier >= 33) return 'Blackwell';
  if (tier >= 24) return 'Ada Lovelace';
  if (tier >= 14) return 'Ampere';
  if (tier >= 7) return 'Turing';
  if (tier >= 3) return 'Pascal';
  return 'Turing';
}

function getNvidiaPcie(tier: number): string {
  if (tier >= 24) return 'PCIe 4.0 x8';
  if (tier >= 14) return 'PCIe 4.0 x16';
  return 'PCIe 3.0 x16';
}

function getNvidiaImage(arch: string): string {
  return NVIDIA_IMAGES[arch] || NVIDIA_IMAGES['Ada Lovelace'];
}

// ─── Generators ──────────────────────────────────────────────────────────────

function generateRxProducts(): Product[] {
  let offerIdCounter = 1000;

  return RX_MODELS.map((model) => {
    const basePrice = 500 + model.tier * 350 + Math.floor(Math.random() * 200);
    const productName = `Placa de Vídeo ${model.name}`;
    const arch = getAmdArchitecture(model.tier);

    return {
      id: model.id,
      name: productName,
      brand: 'AMD',
      category: 'Placas de Vídeo',
      image: AMD_IMAGE,
      specs: {
        'Memória': model.vram,
        'Interface': 'PCIe 4.0 x16',
        'TDP': model.tdp,
        'Fabricante': 'AMD',
        'Arquitetura': arch,
      },
      description: `A ${model.name} oferece excelente desempenho para jogos e criação de conteúdo, com ${model.vram} de memória e suporte a tecnologias AMD FidelityFX.`,
      rating: 4.2 + Math.random() * 0.7,
      reviewsCount: Math.floor(500 + Math.random() * 8000),
      priceHistory: generatePriceHistory(basePrice),
      offers: generateOffers(COMMON_STORES, basePrice, model.id, productName, offerIdCounter),
    };
  });
}

function generateNvidiaProducts(): Product[] {
  let offerIdCounter = 5000;

  return NVIDIA_MODELS.map((model) => {
    const basePrice = 600 + model.tier * 400 + Math.floor(Math.random() * 300);
    const productName = `Placa de Vídeo ${model.name}`;
    const arch = getNvidiaArchitecture(model.tier);

    return {
      id: model.id,
      name: productName,
      brand: 'NVIDIA',
      category: 'Placas de Vídeo',
      image: getNvidiaImage(arch),
      specs: {
        'Memória': model.vram,
        'Interface': getNvidiaPcie(model.tier),
        'TDP': model.tdp,
        'Fabricante': 'NVIDIA',
        'Arquitetura': arch,
      },
      description: `A ${model.name} oferece desempenho excepcional para jogos e criação de conteúdo, com ${model.vram} de memória e suporte a tecnologias NVIDIA DLSS e Ray Tracing.`,
      rating: 4.3 + Math.random() * 0.6,
      reviewsCount: Math.floor(800 + Math.random() * 10000),
      priceHistory: generatePriceHistory(basePrice),
      offers: generateOffers(COMMON_STORES, basePrice, model.id, productName, offerIdCounter),
    };
  });
}

// ─── Other Products ──────────────────────────────────────────────────────────

export const mockProducts: Product[] = [
  {
    id: 'iphone-15',
    name: 'Apple iPhone 15 128GB',
    brand: 'Apple',
    category: 'Smartphones',
    image: 'https://http2.mlstatic.com/D_NQ_NP_779849-MLA71783090124_042023-O.webp',
    gallery: [
      'https://http2.mlstatic.com/D_NQ_NP_779849-MLA71783090124_042023-O.webp',
      'https://http2.mlstatic.com/D_NQ_NP_975026-MLA71782870177_042023-O.webp',
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
    priceHistory: generatePriceHistory(7299),
    offers: generateOffers(COMMON_STORES, 7299, 'iphone-15', 'Apple iPhone 15 128GB', 2000),
  },
  {
    id: 'ssd-1tb-nvme',
    name: 'SSD 1TB NVMe M.2 Kingston KC3000',
    brand: 'Kingston',
    category: 'Armazenamento',
    image: 'https://http2.mlstatic.com/D_NQ_NP_629338-MLA74781074109_022024-O.webp',
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
    priceHistory: generatePriceHistory(699),
    offers: generateOffers(COMMON_STORES, 699, 'ssd-1tb-nvme', 'SSD 1TB NVMe M.2 Kingston KC3000', 3000),
  },
  {
    id: 'ryzen-7-7800x3d',
    name: 'Processador AMD Ryzen 7 7800X3D',
    brand: 'AMD',
    category: 'Processadores',
    image: 'https://http2.mlstatic.com/D_NQ_NP_739338-MLA74781074109_022024-O.webp',
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
    priceHistory: generatePriceHistory(3299),
    offers: generateOffers(COMMON_STORES, 3299, 'ryzen-7-7800x3d', 'Processador AMD Ryzen 7 7800X3D', 4000),
  },
  {
    id: 'monitor-27-4k',
    name: 'Monitor 27" 4K UHD LG UltraFine',
    brand: 'LG',
    category: 'Monitores',
    image: 'https://http2.mlstatic.com/D_NQ_NP_839338-MLA74781074109_022024-O.webp',
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
    priceHistory: generatePriceHistory(2899),
    offers: generateOffers(COMMON_STORES, 2899, 'monitor-27-4k', 'Monitor 27" 4K UHD LG UltraFine', 4500),
  },
  {
    id: 'macbook-air-m3',
    name: 'MacBook Air 13" M3 8GB RAM 256GB SSD',
    brand: 'Apple',
    category: 'Notebooks',
    image: 'https://http2.mlstatic.com/D_NQ_NP_939338-MLA74781074109_022024-O.webp',
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
    priceHistory: generatePriceHistory(11299),
    offers: generateOffers(COMMON_STORES, 11299, 'macbook-air-m3', 'MacBook Air 13" M3 8GB RAM 256GB SSD', 4600),
  },
  ...generateRxProducts(),
  ...generateNvidiaProducts(),
];

// ─── Exports ─────────────────────────────────────────────────────────────────

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
