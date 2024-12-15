import { IsNotEmpty, IsString } from 'class-validator';

export class SendPaymentNotificationDTO {
  @IsString()
  @IsNotEmpty()
  to: string;

  @IsString()
  @IsNotEmpty()
  orderId: string;
}
