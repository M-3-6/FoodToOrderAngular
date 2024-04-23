import { Dish } from "./dish";

export class Cart{
    id:number
    Amount:number
    
    arrDishes:Dish[]
    quantity:number[]

    constructor(Id:number,Amount:number,arrDishes:Dish[],quantity:number[]){
        this.id = Id;
        this.Amount = Amount;
       
        this.arrDishes = arrDishes;
        this.quantity = quantity;
    }
}