import { Component, Input, OnInit } from '@angular/core';
import { Restaurant } from '../../models/restaurant';
import { RestaurantService } from '../../services/restaurantService';
import { ActivatedRoute, Params } from '@angular/router';
import { Dish } from '../../models/dish';
import { MessageService, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrl: './restaurant-details.component.scss',
  providers: [MessageService]
})
export class RestaurantDetailsComponent implements OnInit{
 //arrRestaurants:Restaurant[]=[]
 restaurant:Restaurant = new Restaurant(0,'',0,[],[])
 //restaurantService:RestaurantService = new RestaurantService()


 constructor(private restaurantService: RestaurantService,private activatedRoute:ActivatedRoute,private messageService: MessageService,
  private primengConfig: PrimeNGConfig){
   

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

 ngOnInit() {
  this.primengConfig.ripple = true;
}



  addToCart(dish:Dish){
    if(localStorage.getItem('userId')==null){
      this.messageService.add({
        key: 'tc',
        severity: 'warn',
        summary: 'Info',
        detail: 'Please Login!',
    });
    }
    else{
      
    }
  }
}
