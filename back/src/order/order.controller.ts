import { Controller, Post, Body, Get } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './order.schema';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() orderData: Order) {
    return this.orderService.createOrder(orderData);
  }

  @Get()
  async getOrders() {
    return this.orderService.getOrders();
  }
}
