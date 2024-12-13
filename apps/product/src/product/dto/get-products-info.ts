import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class GetProductsInfoDto {
  @IsArray()
  @IsNotEmpty()
  @IsString({ each: true })
  productIds: string[];
}
