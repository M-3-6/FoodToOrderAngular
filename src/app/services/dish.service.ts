import { Injectable } from '@angular/core';
import { Dish } from '../models/dish';

@Injectable({
  providedIn: 'root'
})
export class DishService {
  arrDishes:Dish[]
  constructor() { 
    this.arrDishes = [
      new Dish(301,"Pizza",199,"../../assets/Images/pizza.jfif",100),
              new Dish(302,"Burger",149,"../../assets/Images/burger.jfif",100),
              new Dish(401,"Hamburger",199,"../../assets/Images/hamburger.jfif",101),
            new Dish(402,"Fries",149,"../../assets/Images/fries.jfif",101),
            new Dish(501,"Dosa",199,"../../assets/Images/dosa.jfif",102),
            new Dish(502,"Idli",149,"../../assets/Images/idli.jfif",102)

    ]
  }
}
