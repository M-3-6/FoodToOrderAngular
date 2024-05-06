import { Component, Input, OnInit } from '@angular/core';
import { Restaurant } from '../../models/restaurant';
import { RestaurantService } from '../../services/restaurantService';
import { ActivatedRoute, Params } from '@angular/router';
import { Dish } from '../../models/dish';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { CartService } from '../../services/cart.service';
import { Cart } from '../../models/cart';
import { CartDish } from '../../models/cartDish';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrl: './restaurant-details.component.scss',
  providers: [MessageService],
})
export class RestaurantDetailsComponent implements OnInit {
  //arrRestaurants:Restaurant[]=[]
  restaurant: Restaurant = new Restaurant('', '', '', true, [], []);
  //restaurantService:RestaurantService = new RestaurantService()

  cartId: number = 0;
  cart: Cart = new Cart('', 0, [], []);
  dishFound: boolean = false;
  flag: number = 2;

  constructor(
    private restaurantService: RestaurantService,
    private cartService: CartService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig
  ) {
    this.activatedRoute.params.subscribe((params: Params) => {
      var rid = params['id'];
      console.log('id obtained from params ', rid);

      this.restaurantService.getRestaurantById(rid).subscribe((data) => {
        this.restaurant = data;
        console.log(this.restaurant);
        console.log(localStorage.getItem('restaurantSelected'));
        if (
          localStorage.getItem('restaurantSelected') == null ||
          this.restaurant.rName == localStorage.getItem('restaurantSelected') ||
          localStorage.getItem('restaurantSelected') == ''
        )
          this.flag = 0;
        else this.flag = 1;
        console.log(
          'restaurant: ',
          localStorage.getItem('restaurantSelected'),
          this.restaurant.rName,
          this.flag
        );
      });
    });
    // this.arrRestaurants=this.restaurantService.getRestaurants()
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }

  isAdmin() {
    if (localStorage.getItem('role') == 'admin') return true;
    else return false;
  }

  addToCart(dish: Dish) {
    if (localStorage.getItem('userId') == null) {
      this.messageService.add({
        key: 'tc',
        severity: 'warn',
        summary: 'Info',
        detail: 'Please Login!',
      });
    } else if (this.flag == 0) {
      var cartId = localStorage.getItem('userId')
        ? localStorage.getItem('userId')
        : '0';
      this.cartId = parseInt(cartId ? cartId : '0');
      this.cartService.getCartById(this.cartId.toString()).subscribe((data) => {
    
        var tempCart = new Cart("0",0,[],[])
        tempCart = data;

      //  console.log(tempCart)

        this.cart.id = tempCart.id.toString();
    //    console.log(tempCart.Amount)

        this.cart.Amount = tempCart.Amount;
          this.cart.user_id = tempCart.user_id;
        tempCart.cartDishes.forEach(cd => {
        //  console.log(cd.Dish)
          this.cart.arrDishes.push(cd.Dish?cd.Dish:new Dish("0","",0,"","",true))
          this.cart.quantity.push(cd.quantity)
        });
        console.log('cart:', this.cart);

        this.dishFound = false;
        for (var i = 0; i < this.cart.arrDishes.length; i++) {
          if (this.cart.arrDishes[i].id == dish.id) {
            this.cart.quantity[i]++;
            this.dishFound = true;
            this.cart.Amount += dish.price;
          }
        }
        if (!this.dishFound) {
          this.cart.arrDishes.push(dish);
          this.cart.quantity.push(1);
          this.cart.Amount += dish.price;
        }

        for(var i=0;i<this.cart.arrDishes.length;i++){
          this.cart.cartDishes.push(new CartDish(parseInt(this.cart.arrDishes[i].id),this.cart.quantity[i],parseInt(this.cart.id)))
        }
        console.log(this.cart);
        //window.location.reload();
        this.cartService.updateCart(this.cart).subscribe((data) => {
          console.log(data);
          this.messageService.add({
            key: 'tr',
            severity: 'success',
            summary: 'Success',
            detail: 'Dish added to cart!',
          });
          localStorage.setItem('restaurantSelected', this.restaurant.rName);
        });
      });
    } else {
      this.messageService.add({
        key: 'tc',
        severity: 'warn',
        summary: 'Info',
        detail: 'Cannot add dishes from multiple restaurants!',
      });
    }
  }
}
