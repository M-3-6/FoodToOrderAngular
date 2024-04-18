import { Component, Input } from '@angular/core';
import { Restaurant } from '../../models/restaurant';
import { RestaurantService } from '../../services/restaurantService';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrl: './restaurant-details.component.scss'
})
export class RestaurantDetailsComponent {
 //arrRestaurants:Restaurant[]=[]
 restaurant:Restaurant = new Restaurant(0,'','',0,[],[])
 //restaurantService:RestaurantService = new RestaurantService()


 constructor(private restaurantService: RestaurantService,private activatedRoute:ActivatedRoute){
  this.activatedRoute.params.subscribe((params:Params)=>{
    var rid = params['id']
    console.log('id obtained from params ',rid)
    

this.restaurantService.getRestaurantById(rid).subscribe(data=>{
  this.restaurant = data;
  console.log(this.restaurant)
})

     
  })
 // this.arrRestaurants=this.restaurantService.getRestaurants()
 }

  displayDish(dish:string){
    console.log(dish+" clicked")
    
  }
}
