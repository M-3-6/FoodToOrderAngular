import { Component } from '@angular/core';

import { UserService } from '../../../services/user.service';
import { Observable } from 'rxjs';
import { User } from '../../../models/user';
import { Order } from '../../../models/order';
import { OrderService } from '../../../services/order.service';
import { Address } from '../../../models/address';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrl: './view-order.component.scss',
})
export class ViewOrderComponent {
  currencyCode: string = 'INR'
  arrUsers: Observable<User[]>;

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
  }

}