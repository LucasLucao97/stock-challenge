import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Restaurant } from './restaurant.schema';

@Injectable()
export class RestaurantService {
  async findByUserId(userId: string): Promise<Restaurant | null> {
    return this.restaurantModel.findOne({ userId }).exec();
  }
  constructor(
    @InjectModel(Restaurant.name) private restaurantModel: Model<Restaurant>,
  ) {}

  async createRestaurant(restaurantData: Restaurant) {
    const restaurant = new this.restaurantModel(restaurantData);
    return restaurant.save();
  }

  async getRestaurants() {
    return this.restaurantModel.find().exec();
  }
}
