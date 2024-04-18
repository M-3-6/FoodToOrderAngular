export class Dish{
    id: number;
    dishName: string;
    
    price: number;
   img_path:string
   restaurant_id:number

    constructor(id:number, dishName: string, price:number,img_path:string, restaurant_id:number){
       this.id = id;
       this.dishName = dishName;
       this.price  =price;
       this.img_path = img_path
       this.restaurant_id = restaurant_id
    }
}