import { Model } from 'mongoose';
import { Order } from './order.schema';
import { Product } from '../product/product.schema';
export declare class OrderService {
    private orderModel;
    private productModel;
    constructor(orderModel: Model<Order>, productModel: Model<Product>);
    createOrder(orderData: Order): Promise<import("mongoose").Document<unknown, {}, Order> & Order & Required<{
        _id: unknown;
    }> & {
        __v?: number;
    }>;
    getOrders(): Promise<(import("mongoose").Document<unknown, {}, Order> & Order & Required<{
        _id: unknown;
    }> & {
        __v?: number;
    })[]>;
}
