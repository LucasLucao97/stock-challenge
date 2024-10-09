import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async findByRestaurantId(restaurantId: string): Promise<Product[]> {
    return this.productModel.find({ restaurantId }).exec();
  }

  async createProduct(productData: Product) {
    const product = new this.productModel(productData);
    return product.save();
  }

  async getProducts() {
    return this.productModel.find().exec();
  }

  async find(id: string): Promise<Product> {
    return this.productModel.findById(id).exec();
  }

  async update(
    id: string,
    newName: string,
    newPrice: number,
    newStock: number,
    newRestaurantId: string,
  ): Promise<Product> {
    const existingProduct = await this.find(id);

    existingProduct.productName = newName ?? existingProduct.productName;
    existingProduct.productPrice = newPrice ?? existingProduct.productPrice;
    existingProduct.productStock = newStock ?? existingProduct.productStock;
    existingProduct.restaurantId =
      newRestaurantId ?? existingProduct.restaurantId;

    return existingProduct.save();
  }

  async delete(id: string) {
    return this.productModel.deleteOne({ _id: id }).exec();
  }
}
