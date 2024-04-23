import { Component, Input, OnInit } from '@angular/core';
import { Restaurant } from '../../models/restaurant';
import { RestaurantService } from '../../services/restaurantService';
import { ActivatedRoute, Params } from '@angular/router';
import { Dish } from '../../models/dish';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { CartService } from '../../services/cart.service';
import { Cart } from '../../models/cart';

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

 cartId:number=0;
 cart:Cart = new Cart(0,0,[],[])
 dishFound:boolean = false;



 constructor(private restaurantService: RestaurantService,private cartService:CartService,private activatedRoute:ActivatedRoute,private messageService: MessageService,
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
      var cartId = localStorage.getItem('userId')?localStorage.getItem('userId'):"0"
      this.cartId = parseInt(cartId?cartId:"0");
      this.cartService.getCartById(this.cartId).subscribe(data=>{
        this.cart = data;
        console.log(this.cart)
        this.dishFound = false;
        for(var i=0;i<this.cart.arrDishes.length;i++){
          if(this.cart.arrDishes[i].id==dish.id){
            this.cart.quantity[i]++;
            this.dishFound = true;
            this.cart.Amount += dish.price;
          }
        }
        if(!this.dishFound){
          this.cart.arrDishes.push(dish)
          this.cart.quantity.push(1)
          this.cart.Amount+=dish.price;
        }
        window.location.reload();
        this.cartService.updateCart(this.cart).subscribe(data=>{
          console.log(data)
          this.messageService.add({
            key: 'tr',
            severity: 'success',
            summary: 'Success',
            detail: 'Dish added to cart!',
            
        });
        
        })
      })
    }
  }
}
