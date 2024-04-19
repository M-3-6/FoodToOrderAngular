import { Component } from '@angular/core';
import { Dish } from '../../models/dish';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  arrDishes:Dish[]=[
    
      new Dish(301,"Pizza",199,"../../assets/Images/pizza.jfif",100,true),
      new Dish(302,"Burger",149,"../../assets/Images/burger.jfif",100,true),

 
    new Dish(401,"Hamburger",199,"../../assets/Images/hamburger.jfif",101,true),
    new Dish(402,"Fries",149,"../../assets/Images/fries.jfif",101,true)

 
    
  ]
}
