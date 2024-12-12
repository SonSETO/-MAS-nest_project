import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Payment, PaymentSchema } from './payment.entity';
import { Product, ProductSchema } from './product.entity';
import { Customer, CustomerSchema } from './customer.entity';
import {
  DeliveryAddress,
  DeliveryAddressSchema,
} from './delivery-address.entity';

export enum OrderStatus {
  pending = 'Pending',
  paymentCancelled = 'PaymentCancelled',
  paymentFailed = 'PaymentFailed',
  paymentProcessed = 'PaymentProcessed',
  deliveryStarted = 'DeliveryStarted',
  deliveryDone = 'DeliveryDone',
}

@Schema()
export class Order extends Document {
  @Prop({
    type: CustomerSchema,
    required: true,
  })
  customer: Customer;

  @Prop({
    type: ProductSchema,
    required: true,
  })
  products: Product[];

  @Prop({
    type: DeliveryAddressSchema,
    required: true,
  })
  deliveryAddress: DeliveryAddress;

  @Prop({
    enum: OrderStatus,
    default: OrderStatus.pending,
  })
  status: OrderStatus;

  @Prop({
    type: PaymentSchema,
    required: true,
  })
  payment: Payment;
}

export const OrderSchema = SchemaFactory.createForClass(Order);