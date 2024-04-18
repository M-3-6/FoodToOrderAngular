import { Component } from '@angular/core';
import { Restaurant } from '../../../models/restaurant';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RestaurantService } from '../../../services/restaurantService';
import { Address } from '../../../models/address';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrl: './add-restaurant.component.scss'
})
export class AddRestaurantComponent {
    count:number = 0;
    countSecondFormSubmit: number = 0;
    restaurant:Restaurant;
    arrAddresses:Address[] = []
    isLinear = false;
    addId:number = 1;

    public addressListForm:FormGroup

    firstFormGroup = this.formBuilder.group({
      rNameCtrl: ['', Validators.required],
      rLocationCtrl: ['', Validators.required],
      rUserIdCtrl: ['', Validators.required],
    });
  
    secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
    

    constructor(private formBuilder:FormBuilder, private restaurantService:RestaurantService){
      this.restaurant = new Restaurant(0,"","",0,[],[])

      this.addressListForm = this.formBuilder.group({
        addresses:this.formBuilder.array([this.createAddressListFormGroup()])
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

    saveFirstStepData(formData:FormGroup){
      console.log(formData.value);
  
      this.restaurant.rName = formData.value.rNameCtrl;
      this.restaurant.location = formData.value.rLocationCtrl;
      this.restaurant.user_id = formData.value.rUserIdCtrl;
    }

    saveSecondStepData(formdata:FormGroup){
      this.countSecondFormSubmit++;
      console.log(this.restaurant);
      if(this.countSecondFormSubmit==this.count){
        console.log(formdata);
        let addressArr = Object.values(formdata);
      console.log(addressArr[0])

      this.restaurant.arrAddresses = []
      this.addId = 1;
      
      addressArr[0].forEach((add:any)=>{console.log(add)
        this.restaurant.arrAddresses.push(new Address(this.addId++,add.houseno,add.street,add.area,add.city,add.pincode,add.country))
      })
      console.log(this.restaurant)
      }
      



      // this.restaurantService.addRestaurant(this.restaurant).subscribe(data=>{
      //   console.log(data)
      // })
    }

    Addresses():FormArray{
      return this.addressListForm.get("addresses") as FormArray
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
  
  
}
