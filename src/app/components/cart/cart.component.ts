import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Observable } from 'rxjs';
import { Dish } from '../../models/dish';
import { Cart } from '../../models/cart';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order';
import { UserService } from '../../services/user.service';
import { CartDish } from '../../models/cartDish';
import { DishOrder } from '../../models/dishorder';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  cart: Cart = new Cart('', 0, [], []);
  cartId: number = 0;
  order: Order = new Order('', '', 0, '', [], [], []);
  tempDish: Dish = new Dish("","",0,"","",false);
  tempDishOrder: DishOrder = new DishOrder(0,this.tempDish,0, new Order("","",0,"",[],[],[]),0);

  constructor(
    private cartService: CartService,
    private orderService: OrderService
  ) {
    console.log('cart constructor called');
  }

  ngOnInit(): void {
    console.log('cart ngOnInit called');
    console.log(localStorage.getItem('userId'));
    if (localStorage.getItem('userId') != null) {
      var cartId = localStorage.getItem('userId')
        ? localStorage.getItem('userId')
        : '0';
      this.cartId = parseInt(cartId ? cartId : '0');

      this.cartService.getCartById(this.cartId.toString()).subscribe((data) => {
      //  console.log(data);
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
        console.log('cart details:', this.cart);

        this.cartService.refreshTheCart(this.cart)

        this.cartService.getTheRefreshedCart().subscribe((data)=>{
            this.cart = data;
        })
      });
    }
  }

  IncreaseQty(index: number) {
    this.cart.quantity[index]++;
    this.cart.Amount += this.cart.arrDishes[index].price;
  }

  DecreaseQty(index: number) {
    this.cart.quantity[index]--;
    this.cart.Amount -= this.cart.arrDishes[index].price;

    if (this.cart.quantity[index] == 0) {
      this.cart.quantity.splice(index, 1);
     this.cart.arrDishes.splice(index, 1);
      if (this.cart.quantity.length == 0) {
        this.onSaveCart();
      }
    }
  }

  Checkout() {
    this.orderService.getOrders().subscribe((data) => {
      this.order.id = "0";

      this.order.orderDate = new Date().toLocaleDateString();
      this.order.userId = this.cart.id;
      this.order.orderAmount = this.cart.Amount;
      this.cart.arrDishes.forEach((arrdish, i) => {
        arrdish ? this.tempDishOrder.dish = arrdish : this.tempDish;
        this.tempDishOrder.dishId = parseInt(arrdish.id);
        this.tempDishOrder.quantity = this.cart.quantity[i];
        this.order.dishOrders.push(this.tempDishOrder);
      });

      this.cart.arrDishes.forEach((dish) => {
        this.order.arrDishes.push(dish);
      });

      this.cart.quantity.forEach((qty) => {
        this.order.quantity.push(qty);
      });

      console.log("order to be added:", this.order);

      this.orderService.addOrder(this.order).subscribe((data) => {
        console.log(data);
      });

      this.onResetCart();
    });
  }

  onResetCart() {
    this.cart.quantity = [];
    this.cart.arrDishes = [];
    this.cart.Amount = 0;
    this.cart.cartDishes = [];
    this.cartService.updateCart(this.cart).subscribe(() => {
      console.log('new cart: ', this.cart);
      localStorage.setItem('restaurantSelected', '');
      // this.cartService.refreshTheCart(this.cart)
    });

    
  }

  onSaveCart() {
    this.cart.cartDishes = []

    for(var i=0;i<this.cart.arrDishes.length;i++){
      this.cart.cartDishes.push(new CartDish(parseInt(this.cart.arrDishes[i].id),this.cart.quantity[i],parseInt(this.cart.id)))
    }
    
    this.cartService.updateCart(this.cart).subscribe(() => {
      console.log('current cart: ', this.cart);
      // this.cartService.refreshTheCart(this.cart)
    });

    
    
  }
}
