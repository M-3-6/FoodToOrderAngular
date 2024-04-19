import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import {Observable} from 'rxjs';
import { User } from '../../../models/user';
import { Order } from '../../../models/order';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-update-order',
  templateUrl: './update-order.component.html',
  styleUrl: './update-order.component.scss'
})
export class UpdateOrderComponent {

  firstOrderFormGroup = this.formBuilder.group({
    id: ['', Validators.required]
  });

  arrUsers: Observable<User[]>
  arrOrders: Observable<Order[]>= new Observable<Order[]>();

  constructor(private formBuilder: FormBuilder, private userService : UserService, private orderService: OrderService) {
      this.arrUsers = this.userService.getUsers();
      //this.arrOrders = new Observable<Order[]>;
  }

  saveFirstStepData(formData:FormGroup){
    console.log(formData.value);

    // this.restaurant.rName = formData.value.rNameCtrl;
    // //this.restaurant.location = formData.value.rLocationCtrl;
    // this.restaurant.user_id = formData.value.rUserIdCtrl;
  }

  onUserSelected(evt: any) {
    this.arrOrders = this.orderService.getOrdersByUserId(evt.target.value);
  }

}
