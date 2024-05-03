import { Component } from '@angular/core';
import { Address } from '../../../models/address';
import { User } from '../../../models/user';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Observable } from "rxjs";
import { dobValidator } from '../../../helpers/customValidation';

@Component({
  selector: 'app-update-user2',
  templateUrl: './update-user2.component.html',
  styleUrl: './update-user2.component.scss'
})
export class UpdateUser2Component {
  arrUsers: Observable<User[]>
  arrAddresses:Address[]=[]
  tempUser:User=new User('','','','','','',new Date(),new Address('','','','','','',''))
  tempAddr:Address=new Address('','','','','','','')

 updateUserForm: FormGroup;
 
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
  
  idUpdated: number=0;
  idAddress: number=0;
  idObtained : number = 0;

  constructor(fb: FormBuilder,private userService:UserService) {
    this.arrUsers=userService.getUsers()

    this.updateUserForm = fb.group({ 
    'id':['', Validators.required]    ,
    'firstName':['',Validators.required],
    'lastName':['',Validators.required],
    'email':['',Validators.required],
    'password':['',Validators.required],
    'date_of_birth':['',Validators.compose([Validators.required, dobValidator])],
    'houseno':['',Validators.required],
    'street':['',Validators.required],
    'area':['',Validators.required],
    'city':['',Validators.required],
    'pincode':['',Validators.required],
    'country':['',Validators.required]
    });

    this.firstName = this.updateUserForm.controls['firstName']; 
    this.lastName = this.updateUserForm.controls['lastName']; 
    this.email = this.updateUserForm.controls['email']; 
    this.password = this.updateUserForm.controls['password']; 
    this.date_of_birth = this.updateUserForm.controls['date_of_birth']; 
    this.houseno = this.updateUserForm.controls['houseno']; 
    this.street = this.updateUserForm.controls['street']; 
    this.area = this.updateUserForm.controls['area']; 
    this.city = this.updateUserForm.controls['city']; 
    this.pincode = this.updateUserForm.controls['pincode']; 
    this.country = this.updateUserForm.controls['country']; 
  }

  onSubmit(updateUserForm: any): void {
    if (this.updateUserForm.valid) {
      this.tempAddr=new Address(this.idAddress.toString(),updateUserForm.houseno,updateUserForm.street,updateUserForm.area,updateUserForm.city,updateUserForm.pincode,updateUserForm.country)
      this.tempUser=new User (this.idObtained.toString(),updateUserForm.firstName,updateUserForm.lastName,updateUserForm.email,updateUserForm.password,"user",updateUserForm.date_of_birth,this.tempAddr)
      this.userService.updateUser(this.tempUser, this.idObtained.toString()).subscribe(data=>{
        console.log(data) 
        console.log(this.tempUser)
      })
      //window.location.reload();
    } else this.markFormGroupTouched(this.updateUserForm);
  }

markFormGroupTouched(formGroup: FormGroup) {
  Object.values(formGroup.controls).forEach((control) => {
    control.markAsTouched();

    if (control instanceof FormGroup) {
      this.markFormGroupTouched(control);
    }
  });
}

  onChangeType(evt:any)
  {
    console.log(evt.target.value)
    this.idObtained = evt.target.value;
    this.userService.getUserById(this.idObtained.toString()).subscribe(user => {
      if (user) {
        this.idAddress = parseInt(user.address.id);
        this.updateUserForm.get('firstName')?.setValue(user.firstName);
        this.updateUserForm.get('lastName')?.setValue(user.lastName)
        this.updateUserForm.get('role')?.setValue(user.role)
        this.updateUserForm.get('email')?.setValue(user.email)
        this.updateUserForm.get('password')?.setValue(user.password)
        this.updateUserForm.get('houseno')?.setValue(user.address.houseno)
        this.updateUserForm.get('street')?.setValue(user.address.street)
        this.updateUserForm.get('area')?.setValue(user.address.area)
        this.updateUserForm.get('city')?.setValue(user.address.city)
        this.updateUserForm.get('country')?.setValue(user.address.country)
        this.updateUserForm.get('pincode')?.setValue(user.address.pincode)
      }
    });
    
  }
}
