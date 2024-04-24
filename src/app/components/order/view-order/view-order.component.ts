import { Component } from '@angular/core';

import { UserService } from '../../../services/user.service';
import { Observable } from 'rxjs';
import { User } from '../../../models/user';
import { Order } from '../../../models/order';
import { OrderService } from '../../../services/order.service';
import { Dish } from '../../../models/dish';
import { Address } from '../../../models/address';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrl: './view-order.component.scss',
})
export class ViewOrderComponent {
  currencyCode: string = 'INR'
  user: User = new User(
    0,
    '',
    '',
    '',
    '',
    '',
    new Date(),
    new Address(0, '', '', '', '', '', '')
  );
  arrUsers: Observable<User[]>;

  order: Order = new Order(0, '', 0, 0, [], []);
  arrOrders: Observable<Order[]> = new Observable<Order[]>();

  addId: number = 1;
  addDishId: number = 1;
  constructor(
    private userService: UserService,
    private orderService: OrderService
  ) {
    this.arrUsers = this.userService.getUsers();
  }

  onUserSelected(evt: any) {
    console.log('user selected: ', evt.target.value);
    this.arrOrders = this.orderService.getOrdersByUserId(evt.target.value);
    console.log('user id selected:', evt.target.value);
  }

  onOrderSelected(evt: any) {
    console.log('order id:', evt.target.value);
    this.orderService.getOrderById(evt.target.value).subscribe((data) => {
      this.order = data;
      console.log('current order:', this.order);
    });
  }
}