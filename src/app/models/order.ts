import { Dish } from "./dish";

export class Order{
     id: string;
     orderDate : string;
     orderAmount : number
     userId: string;
     arrDishes: Dish[]
     quantity: number[]

     constructor(id:string, date: string, amount:number, uid:string, arrDishes:Dish[],qty:number[]){
        this.id = id;
        this.orderDate = date;
        this.userId = uid;
        this.orderAmount = amount;
        this.arrDishes = arrDishes;
        this.quantity = qty;
     }
}