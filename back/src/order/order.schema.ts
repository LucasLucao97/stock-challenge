import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Order extends Document {
  @Prop({ type: [{ productName: String, quantity: Number }], required: true })
  productList: { productName: string; quantity: number }[];

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  totalPrice: number;

  @Prop({ type: String, ref: 'Restaurant' })
  restaurantId: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
