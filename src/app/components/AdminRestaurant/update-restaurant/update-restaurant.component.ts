import { Component } from '@angular/core';
import { RestaurantService } from '../../../services/restaurantService';
import { Restaurant } from '../../../models/restaurant';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-restaurant',
  templateUrl: './update-restaurant.component.html',
  styleUrl: './update-restaurant.component.scss'
})
export class UpdateRestaurantComponent {

  restaurants:Restaurant[]=[]
  isLinear = false;

  firstFormGroup = this.formBuilder.group({
    restCtrl: [[], Validators.required]
   
  });

  constructor(private formBuilder:FormBuilder,private restaurantService: RestaurantService){
    this.restaurantService.getRestaurants().subscribe(data=>{
      this.restaurants= data;
      console.log(this.restaurants);
    })
  }

  saveFirstStepData(formData:FormGroup){
    console.log(formData.value);
    console.log(formData.value.restCtrl)
    // this.restaurant.rName = formData.value.rNameCtrl;
    // //this.restaurant.location = formData.value.rLocationCtrl;
    // this.restaurant.user_id = formData.value.rUserIdCtrl;
  }
  
}
