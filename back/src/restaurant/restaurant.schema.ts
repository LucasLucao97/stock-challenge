import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Restaurant extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, default: true })
  active: boolean;

  @Prop({ required: true, type: String, ref: 'User' })
  userId: string;

  /* @Prop({ type: [{ type: String, ref: 'Product' }] })
  products: string[]; // Array de referencias a productos */
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
