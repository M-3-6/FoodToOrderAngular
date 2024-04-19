import { OrderDetail } from "./orderdetail";

export class Order{
     id: number;
     order_date : string;
     order_amount : number
     user_id: number;
     order_details: OrderDetail[]

     constructor(id:number, date: string, amount:number, uid:number, orderdet: OrderDetail[]){
        this.id = id;
        this.order_date = date;
        this.user_id = uid;
        this.order_amount = amount;
        this.order_details = orderdet
     }
}