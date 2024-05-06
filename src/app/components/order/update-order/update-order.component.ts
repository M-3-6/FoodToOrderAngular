import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Observable } from 'rxjs';
import { User } from '../../../models/user';
import { Order } from '../../../models/order';
import { OrderService } from '../../../services/order.service';
import { Dish } from '../../../models/dish';
import { Address } from '../../../models/address';

@Component({
  selector: 'app-update-order',
  templateUrl: './update-order.component.html',
  styleUrl: './update-order.component.scss',
})
export class UpdateOrderComponent {
  user: User = new User(
    '',
    '',
    '',
    '',
    '',
    '',
    new Date(),
    new Address('', '', '', '', '', '', '')
  );
  arrUsers: Observable<User[]>;

  order: Order = new Order('', '', 0, '', [], [], []);
  arrOrders: Order[]=[];

  addId: number = 1;
  addDishId: number = 1;

  public addDishesListForm: FormGroup;

  firstOrderFormGroup = this.formBuilder.group({
    id: [0, Validators.required],
    oid: [0, Validators.required],
  });

  secondFormGroup = this.formBuilder.group({
    oDateCtrl: ['', Validators.required],
    oAmountCtrl: [0, Validators.required],
    oUserIdCtrl: ['', Validators.required],
  });

  thirdFormGroup = this.formBuilder.group({});

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private orderService: OrderService
  ) {
    this.addDishesListForm = this.formBuilder.group({
      dishFormArray: this.formBuilder.array([]),
    });

    this.arrUsers = this.userService.getUsers();
  }

  loadDishesIntoFormArray(Dishes: Dish[]) {
    // console.log(Dishes)
    const dishFormArray = this.addDishesListForm.get(
      'dishFormArray'
    ) as FormArray;
    dishFormArray.clear();
    if (!Array.isArray(Dishes) || Dishes.length == 0) {
      dishFormArray.push(this.createDishFormGroup());
    } else {
      for (var i = 0; i < Dishes.length; i++) {
        dishFormArray.push(
          this.createDishFormGroup(Dishes[i], this.order.quantity[i])
        );
      }
    }
  }

  createDishFormGroup(dish?: Dish, quantity?: number): FormGroup {
    return new FormGroup({
      dishName: new FormControl(dish ? dish.dishName : '', Validators.required),
      price: new FormControl(dish ? dish.price : 0, Validators.required),
      img_path: new FormControl(dish ? dish.img_path : '', Validators.required),
      isAvailable: new FormControl(
        dish ? dish.isAvailable.valueOf().toString() : 'true'
      ),
      quantity: new FormControl(quantity ? quantity : 0),
    });
  }

  onUserSelected(evt: any) {
    console.log('user selected: ', evt.target.value);
    this.orderService.getOrders().subscribe(
      orders => {
        this.arrOrders = orders.filter((order) => order.userId == evt.target.value);
      }
    );
  }

  saveFirstStepData(formData: FormGroup) {
    console.log('user id:', formData.value.id);
    console.log('order id:', formData.value.oid);

    this.orderService.getOrderById(formData.value.oid).subscribe((data) => {
      this.order = data;
      console.log('current order:', this.order);

      this.secondFormGroup.patchValue({
        oDateCtrl: this.order.orderDate,
        oAmountCtrl: this.order.orderAmount,
        oUserIdCtrl: this.order.userId.toString(),
      });

      this.secondFormGroup.disable();
      this.order.arrDishes = [];
      this.order.quantity = [];
      this.order.dishOrders.forEach(dishorder => {
        this.order.arrDishes.push(dishorder.dish);
        this.order.quantity.push(dishorder.quantity)
      });
      //console.log(this.order.arrDishes)
      this.loadDishesIntoFormArray(this.order.arrDishes);
    });
  }

  saveSecondStepData(formData: FormGroup) {}

  saveThirdStepData(formdata: FormGroup) {
    let dishesArr = Object.values(formdata);
    console.log(dishesArr[0]);

    this.addDishId = 1;

    this.order.arrDishes = [];

    let idx = 0;

    this.order.orderAmount = 0;
    this.order.arrDishes = [];
    this.order.quantity = [];

    dishesArr[0].forEach((add: any) => {
      this.order.dishOrders.forEach(dishorder => {
        dishorder.dish = new Dish(
          (dishorder.dishId).toString(),
          add.dishName,
          parseFloat(add.price),
          add.img_path,
          dishorder.dish.restaurant_id,
          JSON.parse(add.isAvailable.toLowerCase())
        );        
        dishorder.quantity = parseInt(add.quantity);

        this.order.arrDishes.push(
          new Dish(
            (dishorder.dishId).toString(),
            add.dishName,
            parseFloat(add.price),
            add.img_path,
            dishorder.dish.restaurant_id,
            JSON.parse(add.isAvailable.toLowerCase())
          )
        );
        this.order.quantity.push(parseInt(add.quantity));     
        this.order.orderAmount += parseFloat(add.price) * parseInt(add.quantity);
        idx++;
      });
    });

    console.log('current order to be updated:', this.order);

    this.orderService
      .updateOrder(this.order, this.order.id)
      .subscribe((data) => {
        console.log('updated order:', data);
      });

    this.secondFormGroup.patchValue({
      oDateCtrl: this.order.orderDate,
      oAmountCtrl: this.order.orderAmount,
      oUserIdCtrl: this.order.userId,
    });
  }

  dishFormArray(): FormArray {
    return this.addDishesListForm.get('dishFormArray') as FormArray;
  }

  public addDishFormGroup() {
    const dishFormArray = this.addDishesListForm.get(
      'dishFormArray'
    ) as FormArray;
    dishFormArray.push(this.createDishFormGroup());
  }

  public removeOrClearDish(i: number) {
    const dishFormArray = this.addDishesListForm.get(
      'dishFormArray'
    ) as FormArray;
    if (dishFormArray.length > 1) {
      dishFormArray.removeAt(i);
    } else {
      dishFormArray.reset();
    }
  }
}
