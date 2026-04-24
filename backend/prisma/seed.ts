import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const CATEGORIES = [
  'Smartphones',
  'Laptops',
  'Tablets',
  'Headphones',
  'Cameras',
  'Gaming',
  'Smartwatches',
  'TVs',
  'Audio',
  'Accessories',
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

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min: number, max: number, decimals = 2): number {
  const val = Math.random() * (max - min) + min;
  return parseFloat(val.toFixed(decimals));
}

function randomChoice<T>(arr: T[]): T {
  return arr[randomInt(0, arr.length - 1)];
}

function generateProductName(category: string, brand: string, index: number): string {
  const adjectives = ['Pro', 'Ultra', 'Max', 'Lite', 'Plus', 'Elite', 'Air', 'Studio', 'X', 'Z'];
  const noun = category === 'Smartphones' ? 'Phone'
    : category === 'Laptops' ? 'Book'
    : category === 'Tablets' ? 'Pad'
    : category === 'Headphones' ? 'Buds'
    : category === 'Cameras' ? 'Cam'
    : category === 'Gaming' ? 'Console'
    : category === 'Smartwatches' ? 'Watch'
    : category === 'TVs' ? 'Vision'
    : category === 'Audio' ? 'Speaker'
    : 'Gear';
  const adj = randomChoice(adjectives);
  return `${brand} ${noun} ${adj} ${String(index).padStart(3, '0')}`;
}

function generateSpecs(category: string): Record<string, string> {
  const baseSpecs: Record<string, string> = {
    'Color': randomChoice(['Black', 'White', 'Silver', 'Blue', 'Red', 'Gray']),
    'Weight': `${randomFloat(0.1, 2.5, 1)} kg`,
    'Warranty': `${randomInt(12, 36)} months`,
  };

  if (category === 'Smartphones' || category === 'Tablets') {
    baseSpecs['Screen'] = `${randomFloat(5.5, 12.9, 1)} inches`;
    baseSpecs['Storage'] = randomChoice(['64GB', '128GB', '256GB', '512GB', '1TB']);
    baseSpecs['Battery'] = `${randomInt(3000, 6000)} mAh`;
  } else if (category === 'Laptops') {
    baseSpecs['Screen'] = `${randomChoice(['13.3', '14', '15.6', '16', '17.3'])} inches`;
    baseSpecs['RAM'] = randomChoice(['8GB', '16GB', '32GB', '64GB']);
    baseSpecs['Storage'] = randomChoice(['256GB SSD', '512GB SSD', '1TB SSD', '2TB SSD']);
  } else if (category === 'Headphones' || category === 'Audio') {
    baseSpecs['Connectivity'] = randomChoice(['Bluetooth 5.0', 'Bluetooth 5.2', 'Bluetooth 5.3', 'Wired']);
    baseSpecs['Battery Life'] = `${randomInt(10, 50)} hours`;
  } else if (category === 'Cameras') {
    baseSpecs['Resolution'] = randomChoice(['24MP', '32MP', '45MP', '61MP']);
    baseSpecs['Video'] = randomChoice(['4K', '8K', '1080p']);
  } else if (category === 'Gaming') {
    baseSpecs['Resolution'] = randomChoice(['1080p', '1440p', '4K']);
    baseSpecs['Storage'] = randomChoice(['512GB', '1TB', '2TB']);
  } else if (category === 'Smartwatches') {
    baseSpecs['Water Resistance'] = randomChoice(['5ATM', '10ATM', 'IP68']);
    baseSpecs['Battery Life'] = `${randomInt(1, 14)} days`;
  } else if (category === 'TVs') {
    baseSpecs['Screen'] = randomChoice(['43', '50', '55', '65', '75', '85']) + ' inches';
    baseSpecs['Resolution'] = randomChoice(['4K', '8K']);
  }

  return baseSpecs;
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

    // Random price fluctuation
    const change = randomFloat(-0.05, 0.05);
    currentPrice = Math.max(basePrice * 0.5, currentPrice * (1 + change));
    currentPrice = parseFloat(currentPrice.toFixed(2));

    history.push({ date, price: currentPrice });
  }

  return history;
}

async function main() {
  console.log('🌱 Starting seed...');

  // Clean existing data
  await prisma.priceHistoryPoint.deleteMany();
  await prisma.offer.deleteMany();
  await prisma.product.deleteMany();
  await prisma.store.deleteMany();

  // Create stores
  const stores = await Promise.all(
    STORE_DATA.map((s) =>
      prisma.store.create({
        data: s,
      }),
    ),
  );
  console.log(`✅ Created ${stores.length} stores`);

  // Create 60 products
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
        gallery:
          Math.random() > 0.3
            ? Array.from({ length: randomInt(2, 5) }, (_, j) =>
                `https://via.placeholder.com/400?text=${encodeURIComponent(name)}+${j + 1}`,
              )
            : [],
        specs: generateSpecs(category),
        description: generateDescription(name, category, brand),
        rating: randomFloat(3.5, 5.0),
        reviewsCount: randomInt(50, 5000),
      },
    });

    // Create offers
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
          url: `https://example.com/product/${product.id}/offer/${store.name.toLowerCase()}`,
          inStock: Math.random() > 0.1,
        },
      });
    }

    // Create price history
    const historyPoints = randomInt(30, 120);
    const priceHistory = generatePriceHistory(basePrice, historyPoints);
    await prisma.priceHistoryPoint.createMany({
      data: priceHistory.map((ph) => ({
        productId: product.id,
        date: ph.date,
        price: ph.price,
      })),
    });

    if ((i + 1) % 10 === 0) {
      console.log(`✅ Created ${i + 1}/${productCount} products`);
    }
  }

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
