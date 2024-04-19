import { Component } from '@angular/core';
import { User } from '../../../models/user';
import { Address } from '../../../models/address';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-add-user2',
  templateUrl: './add-user2.component.html',
  styleUrl: './add-user2.component.scss'
})
export class AddUser2Component {
  tempUser:User=new User(0,'','','','','',new Date(),new Address(0,'','','','','',''))
  tempAddr:Address=new Address(0,'','','','','','')

  
 addUserForm: FormGroup;

 firstName:AbstractControl;
 lastName:AbstractControl;
 email:AbstractControl;
 password:AbstractControl;
 date_of_birth:AbstractControl;
 houseno:AbstractControl;
 street:AbstractControl;
 area:AbstractControl;
 city:AbstractControl;
 pincode:AbstractControl;
 country:AbstractControl;


  //sku:FormControl
  constructor(fb: FormBuilder,private userService:UserService) {
    //this.sku=new FormControl()
    /////////////////
    this.addUserForm = fb.group({     
      
      'firstName':['',Validators.required],
      'lastName':['',Validators.required],
      'email':['',Validators.required],
      'password':['',Validators.required],
      'date_of_birth':['',Validators.required],
      'houseno':['',Validators.required],
      'street':['',Validators.required],
      'area':['',Validators.required],
      'city':['',Validators.required],
      'pincode':['',Validators.required],
      'country':['',Validators.required]
    }); 

    this.firstName = this.addUserForm.controls['firstName']; 
    this.lastName = this.addUserForm.controls['lastName']; 
    this.email = this.addUserForm.controls['email']; 
    this.password = this.addUserForm.controls['password']; 
    this.date_of_birth = this.addUserForm.controls['date_of_birth']; 
    this.houseno = this.addUserForm.controls['houseno']; 
    this.street = this.addUserForm.controls['street']; 
    this.area = this.addUserForm.controls['area']; 
    this.city = this.addUserForm.controls['city']; 
    this.pincode = this.addUserForm.controls['pincode']; 
    this.country = this.addUserForm.controls['country']; 
  }

  onSubmit(addUserFormValue: any): void {
    this.tempAddr=new Address(1,addUserFormValue.houseno,addUserFormValue.street,addUserFormValue.area,addUserFormValue.city,addUserFormValue.pincode,addUserFormValue.country)
    this.tempUser=new User(11,addUserFormValue.firstName,addUserFormValue.lastName,addUserFormValue.email,addUserFormValue.password,"user",addUserFormValue.date_of_birth,this.tempAddr)
    this.userService.addUser(this.tempUser).subscribe(data=>{
      console.log(data) 
    })
  } 
}
