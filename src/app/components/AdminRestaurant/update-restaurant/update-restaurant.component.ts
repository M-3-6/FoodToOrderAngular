import { Component } from '@angular/core';
import { RestaurantService } from '../../../services/restaurantService';
import { Restaurant } from '../../../models/restaurant';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Address } from '../../../models/address';
import { Dish } from '../../../models/dish';

@Component({
  selector: 'app-update-restaurant',
  templateUrl: './update-restaurant.component.html',
  styleUrl: './update-restaurant.component.scss'
})
export class UpdateRestaurantComponent {

  rest:Restaurant = new Restaurant(0,'',0,true,[],[])
  restaurants:Restaurant[]=[]
  isLinear = false;
  addId:number = 1;
  addDishId:number=1;

  public addressListForm:FormGroup

  public addDishesListForm:FormGroup

  firstFormGroup = this.formBuilder.group({
    restCtrl: ['', Validators.required]
   
  });

  secondFormGroup = this.formBuilder.group({
    rNameCtrl: ['', Validators.required],
    // rLocationCtrl: ['', Validators.required],
    rUserIdCtrl: [0, Validators.required],
    isOpenCtrl: ['',Validators.required]
  });

  thirdFormGroup = this.formBuilder.group({});

  fourthFormGroup = this.formBuilder.group({});

  constructor(private formBuilder:FormBuilder,private restaurantService: RestaurantService){
  
   

    this.addressListForm = this.formBuilder.group({
      addresses:this.formBuilder.array([])
    })

    this.addDishesListForm = this.formBuilder.group({
      dishFormArray:this.formBuilder.array([])
    })

    this.restaurantService.getRestaurants().subscribe(data=>{
      this.restaurants= data;
      console.log(this.restaurants); 
    });
  }

  loadAddressesIntoFormArray(Addresses: Address[]) {
    
    const addressFormArray = this.addressListForm.get('addresses') as FormArray;
    if(!Array.isArray(Addresses) || Addresses.length==0){
      addressFormArray.push(this.createAddressFormGroup());
    }
    else{
      Addresses.forEach(address => {
        addressFormArray.push(this.createAddressFormGroup(address));
      });
    } 
  }

  createAddressFormGroup(address?: Address): FormGroup {
    return this.formBuilder.group({
      houseno: [address ? address.houseno : '', Validators.required],
      street: [address ? address.street : '', Validators.required],
      area: [address ? address.area : '', Validators.required],
      city: [address ? address.city : '', Validators.required],
      pincode: [address ? address.pincode : '', Validators.required],
      country: [address ? address.country : '', Validators.required]
    });
  }

  loadDishesIntoFormArray(Dishes: Dish[]) {
    
    const dishFormArray = this.addDishesListForm.get('dishFormArray') as FormArray;
    if( !Array.isArray(Dishes) || Dishes.length==0){
      dishFormArray.push(this.createDishFormGroup());
    }
    else{
      Dishes.forEach(dish => {
        dishFormArray.push(this.createDishFormGroup(dish));
      });
    } 
  }

  createDishFormGroup(dish?: Dish): FormGroup {
         return new FormGroup({
        'dishName':new FormControl(dish ? dish.dishName : '',Validators.required),
        'price':new FormControl(dish ? dish.price : 0,Validators.required),
        'img_path':new FormControl(dish ? dish.img_path : '',Validators.required),
        'isAvailable':new FormControl(dish ? dish.isAvailable.valueOf().toString() : 'true'),
        
      })
  }

  saveFirstStepData(formData:FormGroup){
    console.log("first stepper submit button clicked");
    console.log(formData.value.restCtrl)
    
    this.restaurantService.getRestaurantById(parseInt(formData.value.restCtrl)).subscribe(data=>{
      this.rest = data;
      console.log(this.rest)

      this.secondFormGroup.patchValue({
        rNameCtrl: this.rest.rName,
        rUserIdCtrl: this.rest.user_id,
        isOpenCtrl:this.rest.isOpen.valueOf().toString()
        // Update other form controls as needed
      });

      this.loadAddressesIntoFormArray(this.rest.arrAddresses);

      this.loadDishesIntoFormArray(this.rest.dishes);
    })
 

  }

  saveSecondStepData(formData:FormGroup){
    console.log("2rd stepper submit clicked")
    console.log(formData.value);

    this.rest.rName = formData.value.rNameCtrl;
    //this.restaurant.location = formData.value.rLocationCtrl;
    this.rest.user_id = parseInt(formData.value.rUserIdCtrl);
    this.rest.isOpen = JSON.parse(formData.value.isOpenCtrl.toLowerCase())
  }


  saveThirdStepData(formdata:FormGroup){
    
    console.log("3rd stepper submit clicked")

    let addressArr = Object.values(formdata);
    console.log(addressArr[0])

   // this.restaurant.arrAddresses = []
    this.addId = 1;
    
    this.rest.arrAddresses = []
    addressArr[0].forEach((add:any)=>{
      this.rest.arrAddresses.push(new Address(this.addId++,add.houseno,add.street,add.area,add.city,add.pincode,add.country))
    })
    console.log(this.rest)
  }

  saveFourthStepData(formdata:FormGroup){
    // console.log(evt.srcElement)
    console.log("4th stepper submit clicked")

      let dishesArr = Object.values(formdata);
    console.log(dishesArr[0])

    this.addDishId = 1;
    
    this.rest.dishes = [];

   
   
    dishesArr[0].forEach((add:any)=>{
      this.rest.dishes.push(new Dish(this.addDishId++,add.dishName,parseInt(add.price),add.img_path,parseInt(this.rest.id.toString()),JSON.parse(add.isAvailable.toLowerCase())))
    })
    console.log(this.rest)


    this.restaurantService.updateRestaurant(this.rest).subscribe(data => {
      console.log(data);
    });
    
  }

  
  addresses():FormArray{
    return this.addressListForm.get("addresses") as FormArray
  }

  dishFormArray():FormArray{
    return this.addDishesListForm.get("dishFormArray") as FormArray
  }

  public addAddressFormGroup() {
    const addresses = this.addressListForm.get('addresses') as FormArray
    addresses.push(this.createAddressFormGroup())
  }
  
  public removeOrClearAddress(i: number) {
    const addresses = this.addressListForm.get('addresses') as FormArray
    if (addresses.length > 1) {
      addresses.removeAt(i)
    } else {
      addresses.reset()
    }
  }

  public addDishFormGroup() {
    const dishFormArray = this.addDishesListForm.get('dishFormArray') as FormArray
    dishFormArray.push(this.createDishFormGroup())
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
