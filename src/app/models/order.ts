import { Dish } from "./dish";
import { DishOrder } from "./dishorder";

export class Order{
     id: string;
     orderDate : string;
     orderAmount : number
     userId: string;
     dishOrders: DishOrder[]
     arrDishes: Dish[]
     quantity: number[]

     constructor(id:string, date: string, amount:number, uid:string, dishOrders: DishOrder[], arrDishes:Dish[],qty:number[]){
        this.id = id;
        this.orderDate = date;
        this.userId = uid;
        this.orderAmount = amount;
        this.dishOrders = dishOrders;
        this.arrDishes = arrDishes;
        this.quantity = qty;
     }
}