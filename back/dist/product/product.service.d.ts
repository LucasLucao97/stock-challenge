import { Model } from 'mongoose';
import { Product } from './product.schema';
export declare class ProductService {
    private productModel;
    constructor(productModel: Model<Product>);
    findByRestaurantId(restaurantId: string): Promise<Product[]>;
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
    find(id: string): Promise<Product>;
    update(id: string, newName: string, newPrice: number, newStock: number, newRestaurantId: string): Promise<Product>;
    delete(id: string): Promise<import("mongodb").DeleteResult>;
}
