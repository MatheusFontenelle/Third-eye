import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { ProductsModule } from './products/products.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, HealthModule, ProductsModule],
})
export class AppModule {}
