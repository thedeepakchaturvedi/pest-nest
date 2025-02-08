import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';

export class GetAllCatQueryDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  age: number;

  @IsIn(['Persian', 'Siamese'])
  breed: string;
}
