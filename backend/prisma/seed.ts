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

// ─── Architecture Helpers ────────────────────────────────────────────────────

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

// ─── Seed Functions ──────────────────────────────────────────────────────────

async function seedStores() {
  const stores = await Promise.all(
    STORE_DATA.map((s) => prisma.store.create({ data: s }))
  );
  console.log(`✅ Created ${stores.length} stores`);
  return stores;
}

async function seedGenericProducts(stores: Awaited<ReturnType<typeof seedStores>>) {
  const productCount = 60;

  for (let i = 0; i < productCount; i++) {
    const category = randomChoice(CATEGORIES);
    const brand = randomChoice(BRANDS);
    const name = generateProductName(category, brand, i + 1);
    const basePrice = randomFloat(100, 5000);
    const offerCount = randomInt(2, 10);

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
        specs: generateSpecs(category),
        description: generateDescription(name, category, brand),
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
      console.log(`✅ Created ${i + 1}/${productCount} generic products`);
    }
  }
}

async function seedNvidiaProducts(stores: Awaited<ReturnType<typeof seedStores>>) {
  for (const model of NVIDIA_MODELS) {
    const basePrice = 600 + model.tier * 400 + randomInt(0, 300);
    const productName = `Placa de Vídeo ${model.name}`;
    const arch = getNvidiaArchitecture(model.tier);

    const product = await prisma.product.create({
      data: {
        name: productName,
        brand: 'NVIDIA',
        category: 'Placas de Vídeo',
        image: 'https://http2.mlstatic.com/D_NQ_NP_973786-MLU74198718092_012024-O.webp',
        specs: {
          'Memória': model.vram,
          'Interface': getNvidiaPcie(model.tier),
          'TDP': model.tdp,
          'Fabricante': 'NVIDIA',
          'Arquitetura': arch,
        },
        description: `A ${model.name} oferece desempenho excepcional para jogos e criação de conteúdo, com ${model.vram} de memória e suporte a tecnologias NVIDIA DLSS e Ray Tracing.`,
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

  console.log(`✅ Created ${NVIDIA_MODELS.length} NVIDIA graphics cards`);
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🌱 Starting seed...');

  await prisma.priceHistoryPoint.deleteMany();
  await prisma.offer.deleteMany();
  await prisma.product.deleteMany();
  await prisma.store.deleteMany();

  const stores = await seedStores();
  await seedGenericProducts(stores);
  await seedNvidiaProducts(stores);

  console.log('🎉 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
