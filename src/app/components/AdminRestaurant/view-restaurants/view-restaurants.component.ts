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
  rest:Restaurant = new Restaurant('','','',true,[],[])

  flag: number = 0;

  //restaurantService:RestaurantService = new RestaurantService()
  constructor(private restaurantService: RestaurantService,private router:Router){
   
   this.restaurantService.getRestaurants().subscribe(data=>{
     this.arrRestaurants = data;
     console.log(this.arrRestaurants);
   })
  }
 
  onRestSelected(evt: any) {
    console.log('restaurant selected: ', evt.target.value);
    //this.arrOrders = this.orderService.getOrdersByUserId(evt.target.value);

    this.restaurantService.getRestaurantById(evt.target.value).subscribe(data=>{
      this.rest = data;
      console.log(this.rest)
    })
    this.flag=1;
  }

  deleteRest(restId:string){
    this.restaurantService.deleteRestaurant(restId).subscribe(data=>{
      this.rest = data;
      console.log(this.rest)
    })
  }

  

  //  displayDetails(rid:number){
  //    this.router.navigate(['/restaurantdetails/'+rid])
  //    console.log(rid)
  //  }
}
