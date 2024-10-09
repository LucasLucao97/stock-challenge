import { Document } from 'mongoose';
export declare class Restaurant extends Document {
    name: string;
    active: boolean;
    userId: string;
}
export declare const RestaurantSchema: import("mongoose").Schema<Restaurant, import("mongoose").Model<Restaurant, any, any, any, Document<unknown, any, Restaurant> & Restaurant & Required<{
    _id: unknown;
}> & {
    __v?: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Restaurant, Document<unknown, {}, import("mongoose").FlatRecord<Restaurant>> & import("mongoose").FlatRecord<Restaurant> & Required<{
    _id: unknown;
}> & {
    __v?: number;
}>;
