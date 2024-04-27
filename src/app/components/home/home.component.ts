import { Component } from '@angular/core';
import { Dish } from '../../models/dish';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  currencyCode: string = 'INR';
  arrDishes: Dish[] = [
    new Dish(
      301,
      'Pizza',
      199,
      'https://images.hindustantimes.com/rf/image_size_630x354/HT/p2/2018/09/15/Pictures/_22d8284c-b8b1-11e8-ab60-f008577e130d.jpg',
      100,
      true
    ),
    new Dish(302, 'Burger', 149, '../../assets/Images/burger.jfif', 100, true),

    new Dish(
      401,
      'Hamburger',
      199,
      '../../assets/Images/hamburger.jfif',
      101,
      true
    ),
    new Dish(402, 'Fries', 149, '../../assets/Images/fries2.jpg', 101, true),

    new Dish(
      501,
      'Pancake',
      149,
      'https://www.deputy.com/uploads/2018/10/The-Most-Popular-Menu-Items-That-You-should-Consider-Adding-to-Your-Restaurant_Content-image1-min-1024x569.png',
      101,
      true
    ),
    new Dish(
      502,
      'Dosa',
      70,
      'https://vismaifood.com/storage/app/uploads/public/8b4/19e/427/thumb__1200_0_0_0_auto.jpg',
      101,
      true
    ),
  ];
}
