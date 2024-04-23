import { Component } from '@angular/core';
import { User } from '../../../models/user';
import { Address } from '../../../models/address';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { dobValidator, passwordValidator } from '../../../helpers/customValidation';

@Component({
  selector: 'app-add-user2',
  templateUrl: './add-user2.component.html',
  styleUrl: './add-user2.component.scss'
})
export class AddUser2Component {
  tempUser:User=new User(0,'','','','','',new Date(),new Address(0,'','','','','',''))
  tempAddr:Address=new Address(0,'','','','','','')

  idUpdated:number = 0;
  
 addUserForm: FormGroup;

 firstName:AbstractControl;
 lastName:AbstractControl;
 email:AbstractControl;
 password:AbstractControl;
 con_password:AbstractControl;
 date_of_birth:AbstractControl;
 houseno:AbstractControl;
 street:AbstractControl;
 area:AbstractControl;
 city:AbstractControl;
 pincode:AbstractControl;
 country:AbstractControl;

  constructor(fb: FormBuilder,private userService:UserService) {

    this.addUserForm = fb.group({     
      
      'firstName':['',Validators.required],
      'lastName':['',Validators.required],
      'email':['',Validators.required],
      'password':['',Validators.required],
      'con_password':['',Validators.required],
      'date_of_birth':['',Validators.compose([Validators.required, dobValidator])],
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
    this.con_password = this.addUserForm.controls['con_password'];  
    this.date_of_birth = this.addUserForm.controls['date_of_birth']; 
    this.houseno = this.addUserForm.controls['houseno']; 
    this.street = this.addUserForm.controls['street']; 
    this.area = this.addUserForm.controls['area']; 
    this.city = this.addUserForm.controls['city']; 
    this.pincode = this.addUserForm.controls['pincode']; 
    this.country = this.addUserForm.controls['country']; 

    this.con_password.valueChanges.subscribe(() => {
      this.con_password.setValidators([Validators.required, passwordValidator(this.password)]);
      this.con_password.updateValueAndValidity();
    });
  }

  onSubmit(addUserFormValue: any): void {
    if (this.addUserForm.valid) {
      this.userService.getUsers().subscribe(data => {
        const largestId = Math.max(...data.map(item=>item.id))
        console.log(largestId)
        this.idUpdated = largestId + 1;
        this.tempAddr=new Address(1,addUserFormValue.houseno,addUserFormValue.street,addUserFormValue.area,addUserFormValue.city,addUserFormValue.pincode,addUserFormValue.country)
        this.tempUser=new User(this.idUpdated,addUserFormValue.firstName,addUserFormValue.lastName,addUserFormValue.email,addUserFormValue.password,"user",addUserFormValue.date_of_birth,this.tempAddr)
        this.userService.addUser(this.tempUser).subscribe(data=>{
          console.log(data) 
        })
        window.location.reload();
      })
    } else console.log("Invalid form!")
  } 
}
