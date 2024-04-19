import { Component } from '@angular/core';
import { Restaurant } from '../../../models/restaurant';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RestaurantService } from '../../../services/restaurantService';
import { Address } from '../../../models/address';
import { Dish } from '../../../models/dish';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrl: './add-restaurant.component.scss'
})
export class AddRestaurantComponent {
    count:number = 0;
    dishesCount:number=0;
    // countSecondFormSubmit: number = 0;
    // countThirdFormSubmit:number=0;

    restaurant:Restaurant;
    arrAddresses:Address[] = []
    isLinear = false;
    addId:number = 1;
    addDishId:number=1;

    submitClicked:boolean = false;

    //availabilityOptions:Boolean[] = [true, false]

    public addressListForm:FormGroup

    public addDishesListForm:FormGroup

    firstFormGroup = this.formBuilder.group({
      rNameCtrl: ['', Validators.required],
      // rLocationCtrl: ['', Validators.required],
      rUserIdCtrl: ['', Validators.required],
    });
  
    secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
    
    thirdFormGroup = this.formBuilder.group({});

    constructor(private formBuilder:FormBuilder, private restaurantService:RestaurantService){
      this.restaurant = new Restaurant(0,"",0,[],[])

      this.addressListForm = this.formBuilder.group({
        addresses:this.formBuilder.array([this.createAddressListFormGroup()])
      })

      this.addDishesListForm = this.formBuilder.group({
        dishFormArray:this.formBuilder.array([this.createDishListFormGroup()])
      })

    }

    createAddressListFormGroup():FormGroup{
      this.count++;
      return new FormGroup({
        'houseno':new FormControl('',Validators.required),
        'street':new FormControl('',Validators.required),
        'area':new FormControl('',Validators.required),
        'city':new FormControl('',Validators.required),
        'pincode':new FormControl('',Validators.required),
        'country':new FormControl('',Validators.required),
      })
    }

    createDishListFormGroup():FormGroup{
      this.dishesCount++;
      return new FormGroup({
        'dishName':new FormControl('',Validators.required),
        'price':new FormControl('',Validators.required),
        'img_path':new FormControl('',Validators.required),
        'isAvailable':new FormControl(true),
        
      })
    }

    saveFirstStepData(formData:FormGroup){
      console.log(formData.value);
  
      this.restaurant.rName = formData.value.rNameCtrl;
      //this.restaurant.location = formData.value.rLocationCtrl;
      this.restaurant.user_id = formData.value.rUserIdCtrl;
    }

    saveSecondStepData(formdata:FormGroup){
      // console.log(evt.srcElement)
      // if(submit){
      //   console.log("Submit clicked")
      // }
      console.log("2nd stepper submit clicked")

      console.log(this.restaurant);
      
       // console.log(formdata);
        let addressArr = Object.values(formdata);
      console.log(addressArr[0])

     // this.restaurant.arrAddresses = []
      this.addId = 1;
      
      
      addressArr[0].forEach((add:any)=>{
        this.restaurant.arrAddresses.push(new Address(this.addId++,add.houseno,add.street,add.area,add.city,add.pincode,add.country))
      })
      console.log(this.restaurant)
      
      
      // this.restaurantService.addRestaurant(this.restaurant).subscribe(data=>{
      //   console.log(data)
      // })
    }

    saveThirdStepData(formdata:FormGroup){
      // console.log(evt.srcElement)
      console.log("3rd stepper submit clicked")

        let dishesArr = Object.values(formdata);
      console.log(dishesArr[0])

      this.addDishId = 1;
      
      dishesArr[0].forEach((add:any)=>{
        this.restaurant.dishes.push(new Dish(this.addDishId++,add.dishName,add.price,add.img_path,this.restaurant.id,add.isAvailable))
      })
      console.log(this.restaurant)
      
      
      this.restaurantService.addRestaurant(this.restaurant).subscribe(data=>{
        console.log(data)
      })
    }

    addresses():FormArray{
      return this.addressListForm.get("addresses") as FormArray
    }

    dishFormArray():FormArray{
      return this.addDishesListForm.get("dishFormArray") as FormArray
    }

    public addItineryFormGroup() {
      const addresses = this.addressListForm.get('addresses') as FormArray
      addresses.push(this.createAddressListFormGroup())
    }
    
    public removeOrClearItinery(i: number) {
      const addresses = this.addressListForm.get('addresses') as FormArray
      if (addresses.length > 1) {
        addresses.removeAt(i)
      } else {
        addresses.reset()
      }
    }
  
    public addDishFormGroup() {
      const dishFormArray = this.addDishesListForm.get('dishFormArray') as FormArray
      dishFormArray.push(this.createDishListFormGroup())
    }
    
    public removeOrClearDish(i: number) {
      const dishFormArray = this.addDishesListForm.get('dishFormArray') as FormArray
      if (dishFormArray.length > 1) {
        dishFormArray.removeAt(i)
      } else {
        dishFormArray.reset()
      }
    }
  
}
