import { Dish } from "./dish"

export class CartDish{
//     public int CartId { get; set; }
// public Cart? Cart { get; set; }
// public int DishId { get; set; }
// public Dish? Dish { get; set; }

// public int quantity { get; set; }

DishId:number
Dish?: Dish
quantity:number
CartId:number

constructor(DishId:number,quantity:number,CartId:number){
    this.DishId = DishId;
    
    this.quantity = quantity;
    //while updating cart don't pass dish

    this.CartId = CartId;
    
}
}