import { Model } from 'mongoose';
import { Restaurant } from './restaurant.schema';
export declare class RestaurantService {
    private restaurantModel;
    findByUserId(userId: string): Promise<Restaurant | null>;
    constructor(restaurantModel: Model<Restaurant>);
    createRestaurant(restaurantData: Restaurant): Promise<import("mongoose").Document<unknown, {}, Restaurant> & Restaurant & Required<{
        _id: unknown;
    }> & {
        __v?: number;
    }>;
    getRestaurants(): Promise<(import("mongoose").Document<unknown, {}, Restaurant> & Restaurant & Required<{
        _id: unknown;
    }> & {
        __v?: number;
    })[]>;
}
