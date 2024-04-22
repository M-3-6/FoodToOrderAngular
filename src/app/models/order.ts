import { Dish } from "./dish";

export class Order{
     id: number;
     orderDate : string;
     orderAmount : number
     userId: number;
     arrDishes: Dish[];
     quantity: number[]

     constructor(id:number, date: string, amount:number, uid:number, dishes: Dish[], quantity: number[]){
        this.id = id;
        this.orderDate = date;
        this.userId = uid;
        this.orderAmount = amount;
        this.arrDishes = dishes;
        this.quantity = quantity;
     }
}