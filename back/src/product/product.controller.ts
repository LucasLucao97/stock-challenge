import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.schema';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(@Body() productData: Product) {
    return this.productService.createProduct(productData);
  }

  @Get()
  async getProducts() {
    return this.productService.getProducts();
  }

  @Get(':id')
  findProduct(@Param('id') id: string): Promise<Product> {
    return this.productService.find(id);
  }

  @Get('restaurant/:id')
  async getProductsByRestaurantId(
    @Param('id') restaurantId: string,
  ): Promise<Product[]> {
    return this.productService.findByRestaurantId(restaurantId);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('price') price: number,
    @Body('stock') stock?: number,
    @Body('restaurantId') restaurantId?: string,
  ): Promise<Product> {
    return this.productService.update(id, name, price, stock, restaurantId);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productService.delete(id);
  }
}
