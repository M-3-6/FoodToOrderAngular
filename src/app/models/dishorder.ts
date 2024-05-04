import { Dish } from "./dish";
import { Order } from "./order";

export class DishOrder {
    dishId: number;
    dish: Dish;
    orderId: number;
    order: Order;
    quantity: number;
    
    constructor(dishId: number, dish: Dish, orderId: number, order: Order, quantity: number) {
        this.dishId = dishId;
        this.dish = dish;
        this.orderId = orderId;
        this.order = order;
        this.quantity = quantity;
    }
}