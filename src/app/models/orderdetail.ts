export class OrderDetail{
    id: number;
    order_id : number;
    dish_id : number
    quantity: number;

    constructor(id:number, order_id:number, dish_id:number, quantity:number){
       this.id = id;
       this.order_id = id;
       this.dish_id = dish_id;
       this.quantity = quantity;
    }
}