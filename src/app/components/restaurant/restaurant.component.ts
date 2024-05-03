import { Component } from '@angular/core';
import { Restaurant } from '../../models/restaurant';
import { Dish } from '../../models/dish';
import { RestaurantService } from '../../services/restaurantService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrl: './restaurant.component.scss'
})
export class RestaurantComponent {
  //rName:string="Dominos Pizza"
  //arrRestaurants:string[]=["dominos Pizza","Cafetaria","Tulip"]
  
  arrRestaurants:Restaurant[]=[]
 //restaurantService:RestaurantService = new RestaurantService()
 constructor(private restaurantService: RestaurantService,private router:Router){
  
  this.restaurantService.getRestaurants().subscribe(data=>{
    this.arrRestaurants = data;
  
    console.log(this.arrRestaurants);
  })
 }

  // displayDish(restId:number){
  //   //console.log("Dish displayed")
  //   msgToChild=restId; 
  //   console.log(restId)
  // }

  // @Input() msgFromParent:string="Initial value"
  // openRestaurantDetails(id:number){

  // }

  displayDetails(rid:string){
    this.router.navigate(['/restaurantdetails/'+rid])
    console.log(rid)
  }


}
