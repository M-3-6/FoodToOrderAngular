import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../../../models/user';
import { Address } from '../../../models/address';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.scss'
})
export class UpdateUserComponent {

  updateUserForm: FormGroup
 arrUsers:User[]=[]
 arrAdresses:Address[]=[]
 tempUser = new User(0,'','','','','',new Date(),new Address(0,'','','','','',''))
 tempAddress = new Address(0,'','','','','','')

 idUpdated:number=0;
 user:User = new User(0,'' , '','','','',new Date(),new Address(0,'','','','','',''));

 constructor(fb: FormBuilder,private userService:UserService){
  this.arrUsers=this.userService.getUsers()
  this.updateUserForm = fb.group({
    'id':[0],
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
 onChangeType(evt:any){
    console.log(evt.target.value);

    var idObtained = evt.target.value;
    this.idUpdated = parseInt(idObtained.split(':')[1].trim());
    console.log("this.idUpdated",this.idUpdated);

    this.user = this.userService.getUserById(this.idUpdated)
    console.log(this.user)
    console.log(this.updateUserForm)
    //console.log(this.updateUserForm.value)
    // console.log( this.updateUserForm.get('firstName'))
    // this.updateUserForm.patchValue(
    //   {
    //     firstName:this.user.firstName
    //   }
   // )
    this.updateUserForm.get('firstName')?.setValue(this.user.firstName)
      this.updateUserForm.get('lastName')?.setValue(this.user.lastName)
      this.updateUserForm.get('role')?.setValue(this.user.role)
      this.updateUserForm.get('email')?.setValue(this.user.email)
      this.updateUserForm.get('password')?.setValue(this.user.password)
      this.updateUserForm.get('houseno')?.setValue(this.user.address.houseno)
      this.updateUserForm.get('street')?.setValue(this.user.address.street)
      this.updateUserForm.get('area')?.setValue(this.user.address.area)
      this.updateUserForm.get('city')?.setValue(this.user.address.city)
      this.updateUserForm.get('pincode')?.setValue(this.user.address.pincode)
      this.updateUserForm.get('country')?.setValue(this.user.address.country)
 }

  onSubmit(updateUserFormValue:any)
  {
    console.log("you submitted value",updateUserFormValue)
    console.log(updateUserFormValue.firstName)
    this.tempAddress= new Address(0,updateUserFormValue.houseno,updateUserFormValue.street,updateUserFormValue.area,updateUserFormValue.city,updateUserFormValue.pincode,updateUserFormValue.country);
    this.tempUser = new User(111,updateUserFormValue.firstName,updateUserFormValue.lastName,updateUserFormValue.email,updateUserFormValue.password,updateUserFormValue.role,new Date(),this.tempAddress);
    this.userService.updateUser(this.tempUser);
  }
}
