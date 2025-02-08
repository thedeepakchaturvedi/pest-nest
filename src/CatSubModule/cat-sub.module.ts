import { Module } from '@nestjs/common';
import { CatsSubController } from './cat-sub.controller';
import { CatsSubService } from './cat-sub.service';

@Module({
  controllers: [CatsSubController],
  providers: [CatsSubService],
  exports: [CatsSubService],
})
export class CatsSubModule {}
