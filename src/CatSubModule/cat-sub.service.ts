import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsSubService {
  findAll() {
    return 'This action returns all sub cats';
  }
}
