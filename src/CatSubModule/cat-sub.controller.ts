import { Controller, Get } from '@nestjs/common';
import { CatsSubService } from './cat-sub.service';

@Controller('/cats/submodel')
export class CatsSubController {
  constructor(private catSubService: CatsSubService) {}
  @Get()
  findAll(): string {
    return this.catSubService.findAll();
  }
}
