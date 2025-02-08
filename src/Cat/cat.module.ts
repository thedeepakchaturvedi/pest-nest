import { Module } from '@nestjs/common';
import { CatsController } from './cat.controller';
import { CatsService } from './cat.service';
import { CatsSubService } from '../CatSubModule/cat-sub.service';

@Module({
  imports: [],
  controllers: [CatsController],
  providers: [CatsService, CatsSubService],
})
export class CatsModule {}
