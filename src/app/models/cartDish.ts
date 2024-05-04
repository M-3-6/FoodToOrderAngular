import { Dish } from "./dish"

export class CartDish{
//     public int CartId { get; set; }
// public Cart? Cart { get; set; }
// public int DishId { get; set; }
// public Dish? Dish { get; set; }

// public int quantity { get; set; }

DishId:number
Dish: Dish
quantity:number

constructor(DishId:number,Dish:Dish,quantity:number){
    this.DishId = DishId;
    this.Dish = Dish;
    this.quantity = quantity;
}
}