import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  productName: string;

  @Prop({ required: true })
  productPrice: number;

  @Prop({ required: true })
  productStock: number;

  @Prop({ type: String, ref: 'Restaurant' })
  restaurantId: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
