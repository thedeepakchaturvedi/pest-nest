import { Inject, Injectable } from '@nestjs/common';
import { CatsSubService } from '../CatSubModule/cat-sub.service';

@Injectable()
export class CatsService {
  constructor(@Inject(CatsSubService) private catsSubService: CatsSubService) {}
  findAll() {
    const response = this.catsSubService.findAll();
    return {
      message: 'This action returns all cats',
      response,
    };
  }
}
