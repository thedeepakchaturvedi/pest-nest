import { Controller, Get } from '@nestjs/common';
import { DogsService } from './dog.service';

@Controller('dogs')
export class DogsController {
  constructor(private dogsService: DogsService) {}
  @Get()
  findAll(): string {
    return this.dogsService.findAll();
  }
}
