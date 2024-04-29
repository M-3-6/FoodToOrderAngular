export class Dish{
    id: string;
    dishName: string;
    
    price: number;
   img_path:string
   restaurant_id:string
   isAvailable:boolean

    constructor(id:string, dishName: string, price:number,img_path:string, restaurant_id:string, isAvailable:boolean){
       this.id = id;
       this.dishName = dishName;
       this.price  =price;
       this.img_path = img_path
       this.restaurant_id = restaurant_id
       this.isAvailable = isAvailable
    }
}