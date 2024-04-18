import { Address } from "./address";
import { Dish } from "./dish";

export class Restaurant{
     id: number;
     rName: string;
     location: string;
     user_id: number;
     dishes: Dish[];
     arrAddresses:Address[]

     constructor(id:number, rName: string, location:string, uid:number, dishes:Dish[],arrAddresses:Address[]){
        this.id = id;
        this.rName = rName;
        this.location=location;
        this.user_id  =uid;
        this.dishes =dishes;
        this.arrAddresses = arrAddresses;
     }
}