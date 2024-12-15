import { IsNotEmpty, IsString } from 'class-validator';

export class DeliveryStartDTO {
  @IsString()
  @IsNotEmpty()
  id: string;
}
