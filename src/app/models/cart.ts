import { Dish } from "./dish"

export class Cart{
    Id:number
    Amount:number
    UserId:number
    arrDishes: Dish[]
    quantity: number[]

    constructor(Id:number,Amount:number,UserId:number, arrDishes: Dish[], quantity: number[]){
        this.Id = Id;
        this.Amount = Amount;
        this.UserId = UserId;
        this.arrDishes = arrDishes
        this.quantity = quantity
    }
}