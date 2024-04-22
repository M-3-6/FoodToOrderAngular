import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Observable } from 'rxjs';
import { Dish } from '../../models/dish';
import { Cart } from '../../models/cart';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  arrDishes: Dish[] = [];
  cartId : string = "";
  cart: Cart = new Cart(0,0,0,[],[]);
  order: Order = new Order(0,"",0,0,[],[])

  constructor(private cartService: CartService, private orderService: OrderService) {
    this.cartId = cartService.getCartId()
    if (this.cartId) {
      console.log("user id:",this.cartId)
      this.cartService.getCartById(this.cartId).subscribe(
        data => {
        this.cart = data;
        console.log("cart details:", data);
        }
      )
    }
  }
  
  incrementQty(i: number) {
    this.cart.quantity[i] += 1;
    this.cart.Amount += this.cart.arrDishes[i].price;
  }

  decrementQty(i:number) {
    if (this.cart.quantity[i] > 0){
      this.cart.quantity[i] -= 1;
      this.cart.Amount -= this.cart.arrDishes[i].price;
    }
    if (this.cart.quantity[i] <= 0) {
      // reset cart
      this.cart.quantity.splice(i, 1)
      this.cart.arrDishes.splice(i,1);
    }
  }

  onResetCart() {
    this.cart.quantity = []
    this.cart.arrDishes = []
  }

  onCheckout() {
    console.log("total=",this.cart.Amount);
    this.orderService.getOrders().subscribe(data=>{
      const largestId = Math.max(...data.map(item=>item.id))
      this.order.id = largestId + 1;
      this.order.orderAmount = this.cart.Amount;
      this.order.arrDishes = this.cart.arrDishes;
      this.order.quantity = this.cart.quantity;
      this.order.userId = parseInt(this.cartId);
      this.order.orderDate = new Date().toLocaleDateString();
      console.log("order details:",this.order)
      this.orderService.addOrder(this.order).subscribe(
        data => {
        console.log("added order", data);
        }
      );
    this.orderService.getOrdersByUserId(parseInt(this.cartId)).subscribe(
      data => {
        console.log(data);
      }
    )
    });
  }

}
