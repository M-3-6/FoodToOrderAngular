import { Component } from '@angular/core';
import { Restaurant } from '../../../models/restaurant';
import { RestaurantService } from '../../../services/restaurantService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-restaurants',
  templateUrl: './view-restaurants.component.html',
  styleUrl: './view-restaurants.component.scss'
})
export class ViewRestaurantsComponent {
  arrRestaurants:Restaurant[]=[]
  //restaurantService:RestaurantService = new RestaurantService()
  constructor(private restaurantService: RestaurantService,private router:Router){
   
   this.restaurantService.getRestaurants().subscribe(data=>{
     this.arrRestaurants = data;
     console.log(this.arrRestaurants);
   })
  }
 

   displayDetails(rid:number){
     this.router.navigate(['/restaurantdetails/'+rid])
     console.log(rid)
   }
}
