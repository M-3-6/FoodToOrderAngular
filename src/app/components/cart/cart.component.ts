import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Observable } from 'rxjs';
import { Dish } from '../../models/dish';
import { Cart } from '../../models/cart';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  cart: Cart = new Cart('', 0, [], []);
  cartId: number = 0;
  order: Order = new Order('', '', 0, '', [], [], []);

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
        this.cart = data;
        console.log('cart details:', this.cart);
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
      const largestId = Math.max(...data.map((item) => parseInt(item.id)));
      console.log(largestId);
      this.order.id = (largestId + 1).toString();

      this.order.orderDate = new Date().toLocaleDateString();
      this.order.userId = this.cart.id;
      this.order.orderAmount = this.cart.Amount;
      this.cart.arrDishes.forEach((dish) => {
        this.order.arrDishes.push(dish);
      });

      this.cart.quantity.forEach((qty) => {
        this.order.quantity.push(qty);
      });

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
    this.cartService.updateCart(this.cart).subscribe(() => {
      console.log('new cart: ', this.cart);
      localStorage.setItem('restaurantSelected', '');
    });
  }

  onSaveCart() {
    this.cartService.updateCart(this.cart).subscribe(() => {
      console.log('current cart: ', this.cart);
    });
  }
}
