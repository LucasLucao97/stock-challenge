import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RestaurantModule } from './restaurant/restaurant.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/SuperSano_DB'),
    ProductModule,
    OrderModule,
    UserModule,
    AuthModule,
    RestaurantModule,
  ],
})
export class AppModule {}
