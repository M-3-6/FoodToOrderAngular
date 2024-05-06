import { CartDish } from "./cartDish";
import { Dish } from "./dish";

export class Cart{
    id:string
    Amount:number
    user_id:number=0
    arrDishes:Dish[]
    quantity:number[]

    cartDishes:CartDish[]=[]


    constructor(Id:string,Amount:number,arrDishes:Dish[],quantity:number[]){
        this.id = Id;
        this.Amount = Amount;
       
        this.arrDishes = arrDishes;
        this.quantity = quantity;
    }
}