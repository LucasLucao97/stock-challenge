"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const order_schema_1 = require("./order.schema");
const product_schema_1 = require("../product/product.schema");
let OrderService = class OrderService {
    constructor(orderModel, productModel) {
        this.orderModel = orderModel;
        this.productModel = productModel;
    }
    async createOrder(orderData) {
        for (const item of orderData.productList) {
            const product = await this.productModel.findOne({
                productName: item.productName,
            });
            if (product && product.productStock >= item.quantity) {
                product.productStock -= item.quantity;
                await product.save();
            }
            else {
                throw new Error(`Stock insuficiente para el producto: ${item.productName}`);
            }
        }
        const order = new this.orderModel(orderData);
        return order.save();
    }
    async getOrders() {
        return this.orderModel.find().exec();
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(order_schema_1.Order.name)),
    __param(1, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], OrderService);
//# sourceMappingURL=order.service.js.map