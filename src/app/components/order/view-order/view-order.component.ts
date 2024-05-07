import { Component } from '@angular/core';

import { UserService } from '../../../services/user.service';
import { Observable } from 'rxjs';
import { User } from '../../../models/user';
import { Order } from '../../../models/order';
import { OrderService } from '../../../services/order.service';
import { Address } from '../../../models/address';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrl: './view-order.component.scss',
})
export class ViewOrderComponent {
  currencyCode: string = 'INR'
  arrUsers: Observable<User[]>;
  flag: number = 0;
  arrOrders: Order[] = [];

  addId: number = 1;
  addDishId: number = 1;
  constructor(
    private userService: UserService,
    private orderService: OrderService,
    private messageService:MessageService
  ) {
    this.arrUsers = this.userService.getUsers();
  }

  onUserSelected(evt: any) {
    console.log('user selected: ', evt.target.value);
    this.orderService.getOrders().subscribe(
      orders => {
        this.arrOrders = orders.filter((order) => order.userId == evt.target.value);
        if(this.arrOrders.length==0){
          this.onNoOrdersPrompted();
        }
        else{
          this.arrOrders.forEach(order => {
            order.dishOrders.forEach(dishorder => {
              if (order.quantity == null) order.quantity = [];
              if(order.arrDishes == null) order.arrDishes = [];
              order.quantity.push(dishorder.quantity);
              order.arrDishes.push(dishorder.dish);
            });
          });
        }
        
      }
    )
  }

  resetFlag() {
    this.flag = 0;
  }

  onNoOrdersPrompted() {
    this.flag = 1;
    this.messageService.add({
      key: 'tr',
      severity: 'info',
      summary: 'Info',
      detail: 'No Orders!',     
  });
  }

}