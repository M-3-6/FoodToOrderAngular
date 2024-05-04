import { Dish } from "./dish"

export class CartDish{
//     public int CartId { get; set; }
// public Cart? Cart { get; set; }
// public int DishId { get; set; }
// public Dish? Dish { get; set; }

// public int quantity { get; set; }


Dish: Dish
quantity:number

constructor(Dish:Dish,quantity:number){
    this.Dish = Dish;
    this.quantity = quantity;
}
}