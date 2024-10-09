import { RestaurantService } from './restaurant.service';
import { Restaurant } from './restaurant.schema';
export declare class RestaurantController {
    private readonly restaurantService;
    constructor(restaurantService: RestaurantService);
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
    findByUserId(userId: string): Promise<{
        restaurant: Restaurant;
    }>;
}
