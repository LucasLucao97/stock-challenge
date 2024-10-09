import { ProductService } from './product.service';
import { Product } from './product.schema';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    createProduct(productData: Product): Promise<import("mongoose").Document<unknown, {}, Product> & Product & Required<{
        _id: unknown;
    }> & {
        __v?: number;
    }>;
    getProducts(): Promise<(import("mongoose").Document<unknown, {}, Product> & Product & Required<{
        _id: unknown;
    }> & {
        __v?: number;
    })[]>;
    findProduct(id: string): Promise<Product>;
    getProductsByRestaurantId(restaurantId: string): Promise<Product[]>;
    updateProduct(id: string, name: string, price: number, stock?: number, restaurantId?: string): Promise<Product>;
    deleteProduct(id: string): Promise<import("mongodb").DeleteResult>;
}
