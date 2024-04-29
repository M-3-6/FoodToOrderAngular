import { Address } from "./address";
import { Dish } from "./dish";

export class Restaurant{
     id: string;
     rName: string; 
     user_id: string;
     isOpen:boolean;
     dishes: Dish[];
     arrAddresses:Address[]

     constructor(id:string, rName: string,  uid:string,isOpen:boolean, dishes:Dish[],arrAddresses:Address[]){
        this.id = id;
        this.rName = rName;
        this.user_id  =uid;
        this.isOpen = isOpen;
        this.dishes =dishes;
        this.arrAddresses = arrAddresses;
     }
}