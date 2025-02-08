import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

export class PestControllerQueryDto {
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    else if (value === 'false') return false;
    return value;
  })
  createSVG: boolean;
}
