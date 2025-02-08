import {
  Controller,
  Get,
  Query,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CatsService } from './cat.service';
import { GetAllCatQueryDto } from './dto/cat.dto';

@Controller('cats')
@UsePipes(new ValidationPipe({ transform: true }))
export class CatsController {
  constructor(private catsService: CatsService) {}
  @Get()
  findAll(@Req() req: Request, @Query() query: GetAllCatQueryDto) {
    return this.catsService.findAll();
  }
}
