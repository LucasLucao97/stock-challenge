import { Controller, Post, Body, Get, UseGuards, Param } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { Restaurant } from './restaurant.schema';
import { JwtGuard } from '../auth/guards/jwt.guard';
@Controller('restaurants')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post()
  async createRestaurant(@Body() restaurantData: Restaurant) {
    return this.restaurantService.createRestaurant(restaurantData);
  }

  @Get()
  async getRestaurants() {
    return this.restaurantService.getRestaurants();
  }

  @UseGuards(JwtGuard)
  @Get('user/:userId')
  async findByUserId(@Param('userId') userId: string) {
    const restaurant = await this.restaurantService.findByUserId(userId);
    return { restaurant };
  }
}
