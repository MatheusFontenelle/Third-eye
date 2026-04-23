# Third-eye Backend

Backend REST API for the Third-eye price comparison platform.

## Stack

- **Runtime:** Node.js 20 + TypeScript
- **Framework:** NestJS
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Docs:** Swagger / OpenAPI
- **Containerization:** Docker + Docker Compose

## Project Structure

```
backend/
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Development seed script
├── src/
│   ├── main.ts            # Application bootstrap
│   ├── app.module.ts      # Root module
│   ├── prisma/            # Prisma service & module
│   ├── common/            # Filters, interceptors, shared DTOs
│   ├── health/            # Health check endpoint
│   └── products/          # Products search & detail endpoints
├── Dockerfile
├── docker-compose.yml
└── package.json
```

## Quick Start (Docker)

The fastest way to get everything running locally:

```bash
# Start PostgreSQL + API with hot reload
docker-compose up -d

# View logs
docker-compose logs -f api
```

The API will be available at `http://localhost:3000`.

- API base: `http://localhost:3000/api/v1`
- Swagger docs: `http://localhost:3000/api/docs`

## Local Development (without Docker)

### Prerequisites

- Node.js 20+
- PostgreSQL 14+ running locally

### Setup

1. **Install dependencies**

```bash
npm install
```

2. **Environment variables**

```bash
cp .env.example .env
# Edit .env with your local database credentials
```

3. **Run database migrations**

```bash
npx prisma migrate dev --name init
```

4. **Generate Prisma client**

```bash
npx prisma generate
```

5. **Seed the database**

```bash
npm run db:seed
```

6. **Start development server**

```bash
npm run dev
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start with hot reload |
| `npm run build` | Build for production |
| `npm run start` | Start production build |
| `npm run lint` | Run ESLint |
| `npm run db:migrate` | Create/run migrations |
| `npm run db:deploy` | Deploy migrations (production) |
| `npm run db:seed` | Seed development data |
| `npm run db:studio` | Open Prisma Studio GUI |
| `npm run db:reset` | Reset database and re-run migrations |

## API Endpoints

### Health Check

```bash
curl http://localhost:3000/api/v1/health
```

Response:
```json
{ "status": "ok" }
```

### Search Products

```bash
# Basic search
curl "http://localhost:3000/api/v1/products/search?q=iphone&sort=price_asc&page=1&pageSize=20"

# With filters
curl "http://localhost:3000/api/v1/products/search?q=laptop&minPrice=1000&maxPrice=3000&stores=TechWorld,PrimeTech&conditions=new&refurbished&freeShippingOnly=true&sort=total_price_asc"

# With max shipping days
curl "http://localhost:3000/api/v1/products/search?maxShippingDays=3&sort=shipping_time_asc"
```

Query Parameters:

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `q` | string | `""` | Search query |
| `minPrice` | number | - | Minimum offer price |
| `maxPrice` | number | - | Maximum offer price |
| `stores` | string[] | - | Filter by store names (CSV or repeated) |
| `conditions` | string[] | - | Filter by conditions: `new`, `used`, `refurbished` |
| `maxShippingDays` | number | - | Maximum shipping time |
| `freeShippingOnly` | boolean | `false` | Only free shipping offers |
| `sort` | string | `price_asc` | `price_asc`, `total_price_asc`, `store_rating_desc`, `shipping_time_asc` |
| `page` | number | `1` | Page number |
| `pageSize` | number | `20` | Items per page (max 100) |

### Get Product by ID

```bash
curl http://localhost:3000/api/v1/products/PRODUCT_ID_HERE
```

## Data Models

### Product

```typescript
{
  id: string;
  name: string;
  brand: string;
  category: string;
  image: string;
  gallery?: string[];
  specs: Record<string, string>;
  description: string;
  rating: number;
  reviewsCount: number;
  priceHistory: { date: string; price: number }[];
  offers: Offer[];
}
```

### Offer

```typescript
{
  id: string;
  productId: string;
  store: string;
  storeLogo?: string;
  storeRating: number;
  storeReviewsCount: number;
  price: number;
  originalPrice?: number;
  shipping: number;
  shippingTimeDays: number;
  freeShipping: boolean;
  condition: 'new' | 'used' | 'refurbished';
  url: string;
  inStock: boolean;
}
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `DATABASE_URL` | - | PostgreSQL connection string |
| `PORT` | `3000` | API server port |
| `CORS_ORIGIN` | `*` | CORS allowed origin(s) |
| `NODE_ENV` | `development` | Environment mode |

## Seed Data

The seed script generates:

- **60 products** across 10 categories
- **2–10 offers per product** from 8 different stores
- **30–120 price history points** per product
- Varied brands, conditions, shipping options, and specs

## Error Format

All errors follow a consistent JSON structure:

```json
{
  "message": "Product with id 'xxx' not found",
  "code": "NOT_FOUND",
  "statusCode": 404,
  "timestamp": "2024-01-15T10:30:00.000Z",
  "path": "/api/v1/products/xxx"
}
```

## CORS

CORS is enabled by default. In development, all origins are allowed (`*`). For production, set `CORS_ORIGIN` to your frontend URL.

## License

MIT
