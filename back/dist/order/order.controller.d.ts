import { OrderService } from './order.service';
import { Order } from './order.schema';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
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
