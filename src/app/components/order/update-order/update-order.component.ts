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
import { DishService } from '../../../services/dish.service';

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
  arrDishes: Dish[] = [];
  tempDish : Dish = new Dish("","",0,"","",false);
  selectedDish : Dish = this.tempDish;

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
    private orderService: OrderService,
    private dishService : DishService
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
    console.log("dish :", dish)
    return new FormGroup({
      dishName: new FormControl({value : dish ? dish.dishName : '', disabled : true}, Validators.required),
      price: new FormControl({value : dish ? dish.price : 0, disabled : true}, Validators.required),
      img_path: new FormControl({value :dish ? dish.img_path : '', disabled : true}, Validators.required),
      isAvailable: new FormControl(
        {value : dish ? dish.isAvailable.valueOf().toString() : 'true', disabled : true}
      ),
      quantity: new FormControl(quantity ? quantity : 0),
      changeDish: new FormControl('')
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

      this.dishService.getDishesByRestaurantId(this.order.dishOrders[0].dish.restaurant_id).subscribe(data => {
        this.arrDishes = data;
        console.log(data)
      })
      //console.log(this.order.arrDishes)
      this.loadDishesIntoFormArray(this.order.arrDishes);
    });
  }

  onDishSelected(evt: any, i: number) {
    console.log('dish selected: ', evt.target.value);
    this.order.dishOrders[i].dishId = evt.target.value;
    this.dishService.getDishById(evt.target.value).subscribe(
      data => {
        this.tempDish = data;
        this.order.dishOrders[i].dish = this.tempDish;
        console.log(this.order.dishOrders[i])
        const dishFormArray = this.addDishesListForm.get('dishFormArray') as FormArray;
        dishFormArray.at(i).value['dishName'] = this.tempDish.dishName;
        dishFormArray.at(i).value['price'] = this.tempDish.price;
        dishFormArray.at(i).value['img_path'] = this.tempDish.img_path;
        dishFormArray.at(i).value['isAvailable'] = this.tempDish.isAvailable;
        console.log(dishFormArray);

        this.createDishFormGroup(this.tempDish, this.order.dishOrders[i].quantity)
        //this.loadDishesIntoFormArray(this.order.arrDishes);
      }
    );
    
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
