import { Address } from "./address";
import { Dish } from "./dish";

export class Restaurant{
     id: number;
     rName: string;
   
     user_id: number;
     dishes: Dish[];
     arrAddresses:Address[]

     constructor(id:number, rName: string,  uid:number, dishes:Dish[],arrAddresses:Address[]){
        this.id = id;
        this.rName = rName;
    
        this.user_id  =uid;
        this.dishes =dishes;
        this.arrAddresses = arrAddresses;
     }
}