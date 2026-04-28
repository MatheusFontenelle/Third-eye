import { Module } from '@nestjs/common';
import { AffiliatesService } from './affiliates.service';
import { CacheModule } from '../common/cache/cache.module';

@Module({
  imports: [CacheModule],
  providers: [AffiliatesService],
  exports: [AffiliatesService],
})
export class AffiliatesModule {}

