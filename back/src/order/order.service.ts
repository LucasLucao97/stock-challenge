import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './order.schema';
import { Product } from '../product/product.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async createOrder(orderData: Order) {
    for (const item of orderData.productList) {
      const product = await this.productModel.findOne({
        productName: item.productName,
      });
      if (product && product.productStock >= item.quantity) {
        product.productStock -= item.quantity;
        await product.save();
      } else {
        throw new Error(
          `Stock insuficiente para el producto: ${item.productName}`,
        );
      }
    }

    const order = new this.orderModel(orderData);
    return order.save();
  }

  async getOrders() {
    return this.orderModel.find().exec();
  }
}
