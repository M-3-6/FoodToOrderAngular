import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Address } from '../../../models/address';
import { User } from '../../../models/user';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent {
 addUserForm: FormGroup
 arrUsers:User[]=[]
 arrAdresses:Address[]=[]
 tempUser = new User(0,'','','','','',new Date(),new Address(0,'','','','','',''))
 tempAddress = new Address(0,'','','','','','')

 constructor(fb: FormBuilder,private userService:UserService){
  this.addUserForm = fb.group({
    'firstName':[''],
    'lastName' : [''],
    'email' : [''],
    'password' : [''],
    'role' : [''],
    'houseno' : [''],
    'street' : [''],
    'area' : [''],
    'city' : [''],
    'pincode' : [''],
    'country' : [''],
  })
 }

 onSubmit(addUserFormValue:any)
{
  console.log(addUserFormValue)
  console.log("you submitted value",this.addUserForm)
  console.log(addUserFormValue.value.firstName)
  // this.tempAddress= new Address(1,addUserFormValue.houseno,addUserFormValue.street,addUserFormValue.area,addUserFormValue.city,addUserFormValue.pincode,addUserFormValue.country);
  // this.tempUser = new User(111,addUserFormValue.firstName,addUserFormValue.lastName,addUserFormValue.role,addUserFormValue.email,addUserFormValue.password,this.tempAddress);
  // this.userService.addUser(this.tempUser);
}
}
