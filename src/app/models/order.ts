import { Dish } from "./dish";

export class Order{
     id: number;
     orderDate : string;
     orderAmount : number
     userId: number;
     arrDishes: Dish[]
     quantity: number[]

     constructor(id:number, date: string, amount:number, uid:number, arrDishes:Dish[],qty:number[]){
        this.id = id;
        this.orderDate = date;
        this.userId = uid;
        this.orderAmount = amount;
        this.arrDishes = arrDishes;
        this.quantity = qty;
     }
}