import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ─── Constants ───────────────────────────────────────────────────────────────

const CATEGORIES = [
  'Smartphones', 'Laptops', 'Tablets', 'Headphones', 'Cameras',
  'Gaming', 'Smartwatches', 'TVs', 'Audio', 'Accessories',
];

const BRANDS = [
  'Apple', 'Samsung', 'Sony', 'Microsoft', 'Dell', 'HP', 'Lenovo',
  'Asus', 'LG', 'Panasonic', 'Canon', 'Nikon', 'Logitech', 'Razer',
  'Xiaomi', 'OnePlus', 'Google', 'Amazon', 'JBL', 'Bose',
];

const STORE_DATA = [
  { name: 'Pichau', logo: 'https://via.placeholder.com/64?text=Pichau', rating: 4.6, reviewsCount: 28000 },
  { name: 'Kabum', logo: 'https://via.placeholder.com/64?text=Kabum', rating: 4.5, reviewsCount: 52000 },
  { name: 'Terabyte Shop', logo: 'https://via.placeholder.com/64?text=TB', rating: 4.8, reviewsCount: 31000 },
  { name: 'AliExpress', logo: 'https://via.placeholder.com/64?text=AliEx', rating: 4.2, reviewsCount: 100000 },
  { name: 'Mercado Livre', logo: 'https://via.placeholder.com/64?text=ML', rating: 4.7, reviewsCount: 200000 },
  { name: 'Amazon', logo: 'https://via.placeholder.com/64?text=Amazon', rating: 4.8, reviewsCount: 500000 },
];

const CONDITIONS = ['new', 'used', 'refurbished'];

// ─── NVIDIA GPU Data ─────────────────────────────────────────────────────────

interface NvidiaGpu {
  name: string;
  vram: string;
  tdp: string;
  tier: number;
}

const NVIDIA_MODELS: NvidiaGpu[] = [
  { name: 'NVIDIA GeForce GTX 1660 6GB', vram: '6GB GDDR5', tdp: '120W', tier: 1 },
  { name: 'NVIDIA GeForce GTX 1660 Super', vram: '6GB GDDR6', tdp: '125W', tier: 2 },
  { name: 'NVIDIA GeForce GTX 1660 Ti 6GB', vram: '6GB GDDR6', tdp: '120W', tier: 2 },
  { name: 'NVIDIA GeForce GTX 1070 8GB', vram: '8GB GDDR5', tdp: '150W', tier: 3 },
  { name: 'NVIDIA GeForce GTX 1070 Ti 8GB', vram: '8GB GDDR5', tdp: '180W', tier: 4 },
  { name: 'NVIDIA GeForce GTX 1080 8GB', vram: '8GB GDDR5X', tdp: '180W', tier: 5 },
  { name: 'NVIDIA GeForce GTX 1080 Ti 11GB', vram: '11GB GDDR5X', tdp: '250W', tier: 6 },
  { name: 'NVIDIA GeForce RTX 2060 6GB', vram: '6GB GDDR6', tdp: '160W', tier: 7 },
  { name: 'NVIDIA GeForce RTX 2060 12GB', vram: '12GB GDDR6', tdp: '185W', tier: 7 },
  { name: 'NVIDIA GeForce RTX 2060 SUPER 8GB', vram: '8GB GDDR6', tdp: '175W', tier: 8 },
  { name: 'NVIDIA GeForce RTX 2070 8GB', vram: '8GB GDDR6', tdp: '175W', tier: 9 },
  { name: 'NVIDIA GeForce RTX 2070 SUPER 8GB', vram: '8GB GDDR6', tdp: '215W', tier: 10 },
  { name: 'NVIDIA GeForce RTX 2080 8GB', vram: '8GB GDDR6', tdp: '215W', tier: 11 },
  { name: 'NVIDIA GeForce RTX 2080 SUPER 8GB', vram: '8GB GDDR6', tdp: '250W', tier: 12 },
  { name: 'NVIDIA GeForce RTX 2080 Ti 11GB', vram: '11GB GDDR6', tdp: '260W', tier: 13 },
  { name: 'NVIDIA GeForce RTX 3050 8GB', vram: '8GB GDDR6', tdp: '130W', tier: 14 },
  { name: 'NVIDIA GeForce RTX 3060 8GB', vram: '8GB GDDR6', tdp: '170W', tier: 15 },
  { name: 'NVIDIA GeForce RTX 3060 12GB', vram: '12GB GDDR6', tdp: '170W', tier: 15 },
  { name: 'NVIDIA GeForce RTX 3060 Ti 8GB', vram: '8GB GDDR6', tdp: '200W', tier: 16 },
  { name: 'NVIDIA GeForce RTX 3070 8GB', vram: '8GB GDDR6', tdp: '220W', tier: 17 },
  { name: 'NVIDIA GeForce RTX 3070 Ti 8GB', vram: '8GB GDDR6X', tdp: '290W', tier: 18 },
  { name: 'NVIDIA GeForce RTX 3080 10GB', vram: '10GB GDDR6X', tdp: '320W', tier: 19 },
  { name: 'NVIDIA GeForce RTX 3080 12GB', vram: '12GB GDDR6X', tdp: '350W', tier: 20 },
  { name: 'NVIDIA GeForce RTX 3080 Ti 12GB', vram: '12GB GDDR6X', tdp: '350W', tier: 21 },
  { name: 'NVIDIA GeForce RTX 3090 24GB', vram: '24GB GDDR6X', tdp: '350W', tier: 22 },
  { name: 'NVIDIA GeForce RTX 3090 Ti 24GB', vram: '24GB GDDR6X', tdp: '450W', tier: 23 },
  { name: 'NVIDIA GeForce RTX 4060 8GB', vram: '8GB GDDR6', tdp: '115W', tier: 24 },
  { name: 'NVIDIA GeForce RTX 4060 Ti 8GB', vram: '8GB GDDR6', tdp: '160W', tier: 25 },
  { name: 'NVIDIA GeForce RTX 4060 Ti 16GB', vram: '16GB GDDR6', tdp: '165W', tier: 25 },
  { name: 'NVIDIA GeForce RTX 4070 12GB', vram: '12GB GDDR6X', tdp: '200W', tier: 26 },
  { name: 'NVIDIA GeForce RTX 4070 SUPER 12GB', vram: '12GB GDDR6X', tdp: '220W', tier: 27 },
  { name: 'NVIDIA GeForce RTX 4070 Ti 12GB', vram: '12GB GDDR6X', tdp: '285W', tier: 28 },
  { name: 'NVIDIA GeForce RTX 4070 Ti SUPER 16GB', vram: '16GB GDDR6X', tdp: '285W', tier: 29 },
  { name: 'NVIDIA GeForce RTX 4080 16GB', vram: '16GB GDDR6X', tdp: '320W', tier: 30 },
  { name: 'NVIDIA GeForce RTX 4080 SUPER 16GB', vram: '16GB GDDR6X', tdp: '320W', tier: 31 },
  { name: 'NVIDIA GeForce RTX 4090 24GB', vram: '24GB GDDR6X', tdp: '450W', tier: 32 },
  { name: 'NVIDIA GeForce RTX 5050 8GB', vram: '8GB GDDR6', tdp: '130W', tier: 33 },
  { name: 'NVIDIA GeForce RTX 5060 8GB', vram: '8GB GDDR6', tdp: '150W', tier: 34 },
  { name: 'NVIDIA GeForce RTX 5060 Ti 8GB', vram: '8GB GDDR6', tdp: '180W', tier: 35 },
  { name: 'NVIDIA GeForce RTX 5060 Ti 16GB', vram: '16GB GDDR6', tdp: '180W', tier: 35 },
  { name: 'NVIDIA GeForce RTX 5070 12GB', vram: '12GB GDDR6', tdp: '250W', tier: 36 },
  { name: 'NVIDIA GeForce RTX 5070 Ti 16GB', vram: '16GB GDDR6', tdp: '300W', tier: 37 },
  { name: 'NVIDIA GeForce RTX 5080 16GB', vram: '16GB GDDR6', tdp: '360W', tier: 38 },
  { name: 'NVIDIA GeForce RTX 5090 32GB', vram: '32GB GDDR6', tdp: '575W', tier: 39 },
];

// ─── Fixtures (produtos realistas para cobrir queries populares) ─────────────

interface FixtureProduct {
  name: string;
  brand: string;
  category: string;
  image: string;
  specs: Record<string, string>;
  description: string;
  rating: number;
  reviewsCount: number;
  basePrice: number;
}

const FIXTURES: FixtureProduct[] = [
  {
    name: 'SSD NVMe 1TB Kingston NV2',
    brand: 'Kingston',
    category: 'Armazenamento',
    image: 'https://http2.mlstatic.com/D_NQ_NP_629338-MLA74781074109_022024-O.webp',
    specs: { Capacidade: '1TB', Interface: 'PCIe 4.0 NVMe', Formato: 'M.2 2280', Leitura: '3500 MB/s', Escrita: '2100 MB/s' },
    description: 'SSD NVMe Kingston NV2 de 1TB com interface PCIe 4.0, ideal para upgrade de notebooks e desktops.',
    rating: 4.6, reviewsCount: 3200, basePrice: 399,
  },
  {
    name: 'Samsung 990 Pro 1TB',
    brand: 'Samsung',
    category: 'Armazenamento',
    image: 'https://http2.mlstatic.com/D_NQ_NP_839338-MLA74781074109_022024-O.webp',
    specs: { Capacidade: '1TB', Interface: 'PCIe 4.0 NVMe', Formato: 'M.2 2280', Leitura: '7450 MB/s', Escrita: '6900 MB/s' },
    description: 'SSD Samsung 990 Pro de 1TB com performance de nível profissional para gamers e criadores.',
    rating: 4.8, reviewsCount: 5400, basePrice: 699,
  },
  {
    name: 'Placa de Vídeo RTX 4070 Super Gigabyte Windforce OC 12GB',
    brand: 'NVIDIA',
    category: 'Placas de Vídeo',
    image: 'https://http2.mlstatic.com/D_NQ_NP_973786-MLU74198718092_012024-O.webp',
    specs: { 'Memória': '12GB GDDR6X', 'Interface': 'PCIe 4.0 x16', 'TDP': '220W', 'Fabricante': 'Gigabyte', 'Arquitetura': 'Ada Lovelace' },
    description: 'Placa de vídeo RTX 4070 SUPER com 12GB GDDR6X, DLSS 3 e Ray Tracing para jogos em 1440p.',
    rating: 4.7, reviewsCount: 2100, basePrice: 4299,
  },
  {
    name: 'Apple iPhone 15 128GB',
    brand: 'Apple',
    category: 'Smartphones',
    image: 'https://http2.mlstatic.com/D_NQ_NP_779849-MLA71783090124_042023-O.webp',
    specs: { Tela: '6.1" OLED', Processador: 'A16 Bionic', Armazenamento: '128GB', Câmera: '48MP', Bateria: '3349 mAh' },
    description: 'iPhone 15 com tela OLED Super Retina XDR, chip A16 Bionic e câmera principal de 48MP.',
    rating: 4.8, reviewsCount: 8560, basePrice: 5299,
  },
  {
    name: 'Apple iPhone 15 Pro Max 256GB',
    brand: 'Apple',
    category: 'Smartphones',
    image: 'https://http2.mlstatic.com/D_NQ_NP_975026-MLA71782870177_042023-O.webp',
    specs: { Tela: '6.7" OLED', Processador: 'A17 Pro', Armazenamento: '256GB', Câmera: '48MP', Bateria: '4441 mAh' },
    description: 'iPhone 15 Pro Max com chip A17 Pro, tela Super Retina XDR de 6.7" e sistema de câmeras avançado.',
    rating: 4.9, reviewsCount: 12400, basePrice: 8799,
  },
  {
    name: 'Processador AMD Ryzen 7 7800X3D',
    brand: 'AMD',
    category: 'Processadores',
    image: 'https://http2.mlstatic.com/D_NQ_NP_739338-MLA74781074109_022024-O.webp',
    specs: { Núcleos: '8', Threads: '16', 'Clock Base': '4.2 GHz', 'Clock Boost': '5.0 GHz', Cache: '96MB L3', TDP: '120W', Socket: 'AM5' },
    description: 'Processador gamer com tecnologia 3D V-Cache, ideal para jogos de alta performance.',
    rating: 4.9, reviewsCount: 3100, basePrice: 2899,
  },
  {
    name: 'Apple Watch Ultra 2',
    brand: 'Apple',
    category: 'Smartwatches',
    image: 'https://http2.mlstatic.com/D_NQ_NP_939338-MLA74781074109_022024-O.webp',
    specs: { Tela: '49mm', 'Resistência': '100m', GPS: 'Precision Dual-Frequency', Bateria: '36 horas' },
    description: 'Apple Watch Ultra 2 com case de titânio, resistência a 100m e bateria de até 36 horas.',
    rating: 4.8, reviewsCount: 4200, basePrice: 6299,
  },
  {
    name: 'Sony WH-1000XM5',
    brand: 'Sony',
    category: 'Headphones',
    image: 'https://http2.mlstatic.com/D_NQ_NP_649338-MLA74781074109_022024-O.webp',
    specs: { Conectividade: 'Bluetooth 5.2', 'Cancelamento': 'Ativo', Bateria: '30 horas', 'Carregamento': 'USB-C' },
    description: 'Fone de ouvido Sony WH-1000XM5 com cancelamento de ruído líder de mercado e 30h de bateria.',
    rating: 4.7, reviewsCount: 7800, basePrice: 2199,
  },
  {
    name: 'GoPro Hero 12 Black',
    brand: 'GoPro',
    category: 'Cameras',
    image: 'https://http2.mlstatic.com/D_NQ_NP_787475-MLU74198718098_012024-O.webp',
    specs: { Resolução: '5.3K', Vídeo: '5.3K60', Estabilização: 'HyperSmooth 6.0', 'Resistência': '10m sem case' },
    description: 'Câmera de ação GoPro Hero 12 Black com gravação 5.3K, HyperSmooth 6.0 e resistência a 10m.',
    rating: 4.6, reviewsCount: 1900, basePrice: 2499,
  },
  {
    name: 'Kindle Paperwhite 11ª Geração',
    brand: 'Amazon',
    category: 'Accessories',
    image: 'https://http2.mlstatic.com/D_NQ_NP_902156-MLU74198718094_012024-O.webp',
    specs: { Tela: '6.8" antirreflexo', Iluminação: 'Ajustável quente', Armazenamento: '16GB', Bateria: '10 semanas' },
    description: 'Kindle Paperwhite 11ª geração com tela de 6.8", iluminação ajustável e bateria de 10 semanas.',
    rating: 4.8, reviewsCount: 15200, basePrice: 799,
  },
  {
    name: 'Roteador TP-Link Archer AX3000 Wi-Fi 6',
    brand: 'TP-Link',
    category: 'Accessories',
    image: 'https://http2.mlstatic.com/D_NQ_NP_839338-MLA74781074109_022024-O.webp',
    specs: { Padrão: 'Wi-Fi 6', Velocidade: '3000 Mbps', Portas: '4x Gigabit', Antenas: '4 fixas' },
    description: 'Roteador TP-Link Archer AX3000 com Wi-Fi 6, velocidade de até 3000 Mbps e 4 portas Gigabit.',
    rating: 4.5, reviewsCount: 3200, basePrice: 399,
  },
  {
    name: 'Carregador Anker GaN 65W 3 Portas',
    brand: 'Anker',
    category: 'Accessories',
    image: 'https://http2.mlstatic.com/D_NQ_NP_973786-MLU74198718092_012024-O.webp',
    specs: { Potência: '65W', Tecnologia: 'GaN', Portas: '2x USB-C + 1x USB-A', Compacto: 'Sim' },
    description: 'Carregador Anker com tecnologia GaN de 65W, 3 portas e design ultra compacto.',
    rating: 4.7, reviewsCount: 5400, basePrice: 249,
  },
  {
    name: 'Power Bank 20000mAh Baseus',
    brand: 'Baseus',
    category: 'Accessories',
    image: 'https://http2.mlstatic.com/D_NQ_NP_629338-MLA74781074109_022024-O.webp',
    specs: { Capacidade: '20000mAh', Saída: '22.5W', Portas: '2x USB-A + 1x USB-C', Display: 'LED digital' },
    description: 'Power bank Baseus de 20000mAh com carregamento rápido de 22.5W e display LED digital.',
    rating: 4.6, reviewsCount: 6700, basePrice: 179,
  },
  {
    name: 'Dell Inspiron 15 3000 i5-1235U 8GB 256GB SSD',
    brand: 'Dell',
    category: 'Laptops',
    image: 'https://http2.mlstatic.com/D_NQ_NP_839338-MLA74781074109_022024-O.webp',
    specs: { Tela: '15.6" Full HD', Processador: 'Intel Core i5-1235U', RAM: '8GB', Armazenamento: '256GB SSD' },
    description: 'Notebook Dell Inspiron 15 com Intel Core i5, 8GB RAM e SSD de 256GB para produtividade.',
    rating: 4.4, reviewsCount: 2100, basePrice: 2899,
  },
  {
    name: 'Lenovo IdeaPad 3 Ryzen 5 5500U 8GB 256GB SSD',
    brand: 'Lenovo',
    category: 'Laptops',
    image: 'https://http2.mlstatic.com/D_NQ_NP_973786-MLU74198718092_012024-O.webp',
    specs: { Tela: '15.6" Full HD', Processador: 'AMD Ryzen 5 5500U', RAM: '8GB', Armazenamento: '256GB SSD' },
    description: 'Notebook Lenovo IdeaPad 3 com AMD Ryzen 5, 8GB RAM e SSD de 256GB.',
    rating: 4.5, reviewsCount: 3400, basePrice: 2599,
  },
  {
    name: 'Notebook ASUS TUF Gaming A15 Ryzen 7 7735HS RTX 3050',
    brand: 'ASUS',
    category: 'Laptops',
    image: 'https://http2.mlstatic.com/D_NQ_NP_629338-MLA74781074109_022024-O.webp',
    specs: { Tela: '15.6" 144Hz', Processador: 'AMD Ryzen 7 7735HS', GPU: 'RTX 3050', RAM: '16GB', Armazenamento: '512GB SSD' },
    description: 'Notebook gamer ASUS TUF Gaming A15 com Ryzen 7, RTX 3050 e tela de 144Hz.',
    rating: 4.6, reviewsCount: 1800, basePrice: 4599,
  },
  {
    name: 'Mouse Logitech G502 HERO',
    brand: 'Logitech',
    category: 'Accessories',
    image: 'https://http2.mlstatic.com/D_NQ_NP_787475-MLU74198718098_012024-O.webp',
    specs: { Sensor: 'HERO 25K', DPI: '25600', Botões: '11', Peso: '121g' },
    description: 'Mouse gamer Logitech G502 HERO com sensor de 25K DPI, 11 botões programáveis e peso ajustável.',
    rating: 4.8, reviewsCount: 12500, basePrice: 349,
  },
  {
    name: 'Teclado Mecânico Redragon Kumara K552',
    brand: 'Redragon',
    category: 'Accessories',
    image: 'https://http2.mlstatic.com/D_NQ_NP_902156-MLU74198718094_012024-O.webp',
    specs: { Switch: 'Outemu Blue', Layout: '60%', Iluminação: 'RGB', Conexão: 'USB-C' },
    description: 'Teclado mecânico Redragon Kumara K552 com switches Outemu Blue, layout compacto 60% e RGB.',
    rating: 4.5, reviewsCount: 8900, basePrice: 229,
  },
  {
    name: 'Smart TV Samsung 55 4K Crystal UHD CU8000',
    brand: 'Samsung',
    category: 'TVs',
    image: 'https://http2.mlstatic.com/D_NQ_NP_839338-MLA74781074109_022024-O.webp',
    specs: { Tela: '55 polegadas', Resolução: '4K UHD', Smart: 'Tizen', HDR: 'HDR10+' },
    description: 'Smart TV Samsung 55" 4K Crystal UHD com processador Crystal 4K e sistema Tizen.',
    rating: 4.6, reviewsCount: 5600, basePrice: 2499,
  },
  {
    name: 'Soundbar LG SP2 2.1 Canais 100W',
    brand: 'LG',
    category: 'Audio',
    image: 'https://http2.mlstatic.com/D_NQ_NP_649338-MLA74781074109_022024-O.webp',
    specs: { Canais: '2.1', Potência: '100W', Subwoofer: 'Wireless', Conectividade: 'Bluetooth, HDMI ARC' },
    description: 'Soundbar LG SP2 com 2.1 canais, 100W de potência e subwoofer wireless.',
    rating: 4.4, reviewsCount: 2100, basePrice: 599,
  },
  {
    name: 'Console Xbox Series X 1TB',
    brand: 'Microsoft',
    category: 'Gaming',
    image: 'https://http2.mlstatic.com/D_NQ_NP_787475-MLU74198718098_012024-O.webp',
    specs: { GPU: 'RDNA 2 12 TFLOPS', Armazenamento: '1TB SSD', Resolução: '4K 120Hz', RayTracing: 'Sim' },
    description: 'Console Xbox Series X com 12 TFLOPS, SSD de 1TB, jogos em 4K a 120Hz e Ray Tracing.',
    rating: 4.8, reviewsCount: 9800, basePrice: 4299,
  },
  {
    name: 'Samsung Galaxy S24 Ultra 256GB',
    brand: 'Samsung',
    category: 'Smartphones',
    image: 'https://http2.mlstatic.com/D_NQ_NP_902156-MLU74198718094_012024-O.webp',
    specs: { Tela: '6.8" QHD+', Processador: 'Snapdragon 8 Gen 3', Armazenamento: '256GB', Câmera: '200MP' },
    description: 'Samsung Galaxy S24 Ultra com S Pen, câmera de 200MP e processador Snapdragon 8 Gen 3.',
    rating: 4.7, reviewsCount: 4200, basePrice: 6499,
  },
  {
    name: 'Intel Core i5-13600K',
    brand: 'Intel',
    category: 'Processadores',
    image: 'https://http2.mlstatic.com/D_NQ_NP_973786-MLU74198718092_012024-O.webp',
    specs: { Núcleos: '14 (6P+8E)', Threads: '20', 'Clock Boost': '5.1 GHz', Cache: '24MB', TDP: '125W', Socket: 'LGA 1700' },
    description: 'Processador Intel Core i5-13600K com 14 núcleos e 20 threads, clock de até 5.1 GHz.',
    rating: 4.8, reviewsCount: 5600, basePrice: 1899,
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min: number, max: number, decimals = 2): number {
  return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
}

function randomChoice<T>(arr: T[]): T {
  return arr[randomInt(0, arr.length - 1)];
}

function generateProductName(category: string, brand: string, index: number): string {
  const adjectives = ['Pro', 'Ultra', 'Max', 'Lite', 'Plus', 'Elite', 'Air', 'Studio', 'X', 'Z'];
  const nouns: Record<string, string> = {
    Smartphones: 'Phone', Laptops: 'Book', Tablets: 'Pad', Headphones: 'Buds',
    Cameras: 'Cam', Gaming: 'Console', Smartwatches: 'Watch', TVs: 'Vision',
    Audio: 'Speaker', Accessories: 'Gear',
  };
  return `${brand} ${nouns[category] ?? 'Gear'} ${randomChoice(adjectives)} ${String(index).padStart(3, '0')}`;
}

function generateSpecs(category: string): Record<string, string> {
  const baseSpecs: Record<string, string> = {
    Color: randomChoice(['Black', 'White', 'Silver', 'Blue', 'Red', 'Gray']),
    Weight: `${randomFloat(0.1, 2.5, 1)} kg`,
    Warranty: `${randomInt(12, 36)} months`,
  };

  const categorySpecs: Record<string, Record<string, string>> = {
    Smartphones: {
      Screen: `${randomFloat(5.5, 12.9, 1)} inches`,
      Storage: randomChoice(['64GB', '128GB', '256GB', '512GB', '1TB']),
      Battery: `${randomInt(3000, 6000)} mAh`,
    },
    Tablets: {
      Screen: `${randomFloat(5.5, 12.9, 1)} inches`,
      Storage: randomChoice(['64GB', '128GB', '256GB', '512GB', '1TB']),
      Battery: `${randomInt(3000, 6000)} mAh`,
    },
    Laptops: {
      Screen: `${randomChoice(['13.3', '14', '15.6', '16', '17.3'])} inches`,
      RAM: randomChoice(['8GB', '16GB', '32GB', '64GB']),
      Storage: randomChoice(['256GB SSD', '512GB SSD', '1TB SSD', '2TB SSD']),
    },
    Headphones: {
      Connectivity: randomChoice(['Bluetooth 5.0', 'Bluetooth 5.2', 'Bluetooth 5.3', 'Wired']),
      'Battery Life': `${randomInt(10, 50)} hours`,
    },
    Audio: {
      Connectivity: randomChoice(['Bluetooth 5.0', 'Bluetooth 5.2', 'Bluetooth 5.3', 'Wired']),
      'Battery Life': `${randomInt(10, 50)} hours`,
    },
    Cameras: {
      Resolution: randomChoice(['24MP', '32MP', '45MP', '61MP']),
      Video: randomChoice(['4K', '8K', '1080p']),
    },
    Gaming: {
      Resolution: randomChoice(['1080p', '1440p', '4K']),
      Storage: randomChoice(['512GB', '1TB', '2TB']),
    },
    Smartwatches: {
      'Water Resistance': randomChoice(['5ATM', '10ATM', 'IP68']),
      'Battery Life': `${randomInt(1, 14)} days`,
    },
    TVs: {
      Screen: `${randomChoice(['43', '50', '55', '65', '75', '85'])} inches`,
      Resolution: randomChoice(['4K', '8K']),
    },
  };

  return { ...baseSpecs, ...categorySpecs[category] };
}

function generateProductUrl(storeName: string, _productId: string, productName: string): string {
  const query = encodeURIComponent(productName);
  const urls: Record<string, string> = {
    Kabum: `https://www.kabum.com.br/busca?q=${query}`,
    Pichau: `https://www.pichau.com.br/search?q=${query}`,
    'Terabyte Shop': `https://www.terabyteshop.com.br/busca?busca=${query}`,
    'Mercado Livre': `https://www.mercadolivre.com.br/busca?q=${query}`,
    AliExpress: `https://pt.aliexpress.com/wholesale?SearchText=${query}`,
    Amazon: `https://www.amazon.com.br/s?k=${query}`,
  };
  return urls[storeName] ?? `https://www.google.com/search?q=${query}`;
}

function generateDescription(name: string, category: string, brand: string): string {
  return `The ${name} by ${brand} is a premium ${category.toLowerCase()} designed for discerning users. 
Featuring cutting-edge technology, exceptional build quality, and industry-leading performance.
Perfect for both professionals and enthusiasts seeking the best in class experience.`;
}

function generatePriceHistory(basePrice: number, points: number): { date: Date; price: number }[] {
  const history: { date: Date; price: number }[] = [];
  const now = new Date();
  let currentPrice = basePrice * randomFloat(0.8, 1.2);

  for (let i = points - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i * randomInt(1, 3));
    const change = randomFloat(-0.05, 0.05);
    currentPrice = Math.max(basePrice * 0.5, currentPrice * (1 + change));
    history.push({ date, price: parseFloat(currentPrice.toFixed(2)) });
  }

  return history;
}

function buildSearchText(name: string, brand: string, category: string, description: string, specs: Record<string, string>): string {
  const specValues = Object.values(specs).join(' ');
  const raw = `${name} ${brand} ${category} ${description} ${specValues}`;
  return raw.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

// ─── Architecture Helpers ────────────────────────────────────────────────────

function getNvidiaArchitecture(tier: number): string {
  if (tier >= 33) return 'Blackwell';
  if (tier >= 24) return 'Ada Lovelace';
  if (tier >= 14) return 'Ampere';
  if (tier >= 7) return 'Turing';
  if (tier >= 3) return 'Pascal';
  return 'Turing';
}

function getNvidiaPcie

function getNvidiaPcie(tier: number): string {
  if (tier >= 24) return 'PCIe 4.0 x8';
  if (tier >= 14) return 'PCIe 4.0 x16';
  return 'PCIe 3.0 x16';
}


async function seedStores() {
  const stores = await Promise.all(
    STORE_DATA.map((s) => prisma.store.create({ data: s }))
  );
  console.log(`Created ${stores.length} stores`);
  return stores;
}

async function seedFixtureProducts(stores) {
  for (const fixture of FIXTURES) {
    const searchText = buildSearchText(fixture.name, fixture.brand, fixture.category, fixture.description, fixture.specs);

    const product = await prisma.product.create({
      data: {
        name: fixture.name,
        brand: fixture.brand,
        category: fixture.category,
        image: fixture.image,
        gallery: [],
        specs: fixture.specs,
        description: fixture.description,
        searchText,
        rating: fixture.rating,
        reviewsCount: fixture.reviewsCount,
      },
    });

    const selectedStores = [...stores].sort(() => Math.random() - 0.5).slice(0, Math.min(4, stores.length));
    for (const store of selectedStores) {
      const price = fixture.basePrice * (0.9 + Math.random() * 0.25);
      const originalPrice = price * (1.05 + Math.random() * 0.25);
      const shipping = store.name === 'Terabyte Shop' ? 15 : (Math.random() > 0.4 ? 0 : randomFloat(10, 40));

      await prisma.offer.create({
        data: {
          productId: product.id,
          storeId: store.id,
          price: parseFloat(price.toFixed(2)),
          originalPrice: parseFloat(originalPrice.toFixed(2)),
          shipping,
          shippingTimeDays: randomInt(1, 7),
          freeShipping: shipping === 0,
          condition: 'new',
          url: generateProductUrl(store.name, product.id, product.name),
          inStock: true,
        },
      });
    }

    const priceHistory = generatePriceHistory(fixture.basePrice, randomInt(10, 30));
    await prisma.priceHistoryPoint.createMany({
      data: priceHistory.map((ph) => ({
        productId: product.id,
        date: ph.date,
        price: ph.price,
      })),
    });
  }

  console.log(`Created ${FIXTURES.length} fixture products`);
}

async function seedGenericProducts(stores) {
  const productCount = 60;

  for (let i = 0; i < productCount; i++) {
    const category = randomChoice(CATEGORIES);
    const brand = randomChoice(BRANDS);
    const name = generateProductName(category, brand, i + 1);
    const basePrice = randomFloat(100, 5000);
    const offerCount = randomInt(2, 10);
    const specs = generateSpecs(category);
    const description = generateDescription(name, category, brand);
    const searchText = buildSearchText(name, brand, category, description, specs);

    const product = await prisma.product.create({
      data: {
        name,
        brand,
        category,
        image: `https://via.placeholder.com/400?text=${encodeURIComponent(name)}`,
        gallery: Math.random() > 0.3
          ? Array.from({ length: randomInt(2, 5) }, (_, j) =>
              `https://via.placeholder.com/400?text=${encodeURIComponent(name)}+${j + 1}`)
          : [],
        specs,
        description,
        searchText,
        rating: randomFloat(3.5, 5.0),
        reviewsCount: randomInt(50, 5000),
      },
    });

    const selectedStores = [...stores].sort(() => Math.random() - 0.5).slice(0, offerCount);
    for (const store of selectedStores) {
      const price = basePrice * randomFloat(0.85, 1.15);
      const originalPrice = Math.random() > 0.5 ? price * randomFloat(1.1, 1.4) : undefined;
      const shipping = Math.random() > 0.3 ? 0 : randomFloat(10, 50);

      await prisma.offer.create({
        data: {
          productId: product.id,
          storeId: store.id,
          price: parseFloat(price.toFixed(2)),
          originalPrice: originalPrice ? parseFloat(originalPrice.toFixed(2)) : null,
          shipping,
          shippingTimeDays: randomInt(1, 14),
          freeShipping: shipping === 0,
          condition: randomChoice(CONDITIONS),
          url: generateProductUrl(store.name, product.id, product.name),
          inStock: Math.random() > 0.1,
        },
      });
    }

    const priceHistory = generatePriceHistory(basePrice, randomInt(30, 120));
    await prisma.priceHistoryPoint.createMany({
      data: priceHistory.map((ph) => ({
        productId: product.id,
        date: ph.date,
        price: ph.price,
      })),
    });

    if ((i + 1) % 10 === 0) {
      console.log(`Created ${i + 1}/${productCount} generic products`);
    }
  }
}

async function seedNvidiaProducts(stores) {
  for (const model of NVIDIA_MODELS) {
    const basePrice = 600 + model.tier * 400 + randomInt(0, 300);
    const productName = `Placa de Video ${model.name}`;
    const arch = getNvidiaArchitecture(model.tier);
    const specs = {
      'Memoria': model.vram,
      'Interface': getNvidiaPcie(model.tier),
      'TDP': model.tdp,
      'Fabricante': 'NVIDIA',
      'Arquitetura': arch,
    };
    const description = `A ${model.name} oferece desempenho excepcional para jogos e criacao de conteudo, com ${model.vram} de memoria e suporte a tecnologias NVIDIA DLSS e Ray Tracing.`;
    const searchText = buildSearchText(productName, 'NVIDIA', 'Placas de Video', description, specs);

    const product = await prisma.product.create({
      data: {
        name: productName,
        brand: 'NVIDIA',
        category: 'Placas de Video',
        image: 'https://http2.mlstatic.com/D_NQ_NP_973786-MLU74198718092_012024-O.webp',
        specs,
        description,
        searchText,
        rating: randomFloat(4.3, 4.9),
        reviewsCount: randomInt(800, 10800),
      },
    });

    for (const store of stores) {
      const price = basePrice * randomFloat(0.9, 1.15);
      const originalPrice = price * randomFloat(1.1, 1.3);
      const shipping = store.name === 'Terabyte Shop' ? 15 : 0;

      await prisma.offer.create({
        data: {
          productId: product.id,
          storeId: store.id,
          price: parseFloat(price.toFixed(2)),
          originalPrice: parseFloat(originalPrice.toFixed(2)),
          shipping,
          shippingTimeDays: randomInt(1, 7),
          freeShipping: shipping === 0,
          condition: 'new',
          url: generateProductUrl(store.name, product.id, product.name),
          inStock: true,
        },
      });
    }

    const priceHistory = generatePriceHistory(basePrice, randomInt(30, 60));
    await prisma.priceHistoryPoint.createMany({
      data: priceHistory.map((ph) => ({
        productId: product.id,
        date: ph.date,
        price: ph.price,
      })),
    });
  }

  console.log(`Created ${NVIDIA_MODELS.length} NVIDIA graphics cards`);
}

async function main() {
  console.log('Starting seed...');

  await prisma.priceHistoryPoint.deleteMany();
  await prisma.offer.deleteMany();
  await prisma.product.deleteMany();
  await prisma.store.deleteMany();

  const stores = await seedStores();
  await seedFixtureProducts(stores);
  await seedGenericProducts(stores);
  await seedNvidiaProducts(stores);

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
