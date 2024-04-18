import { Component } from '@angular/core';
import { Address } from '../../../models/address';
import { User } from '../../../models/user';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-update-user2',
  templateUrl: './update-user2.component.html',
  styleUrl: './update-user2.component.scss'
})
export class UpdateUser2Component {
  arrUsers:User[]=[]
  arrAddresses:Address[]=[]
  tempUser:User=new User(0,'','','','','',new Date(),new Address(0,'','','','','',''))
  tempAddr:Address=new Address(0,'','','','','','')

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
  user: User=new User(0,'','','','','',new Date(),new Address(0,'','','','','',''));
 // myForm: any;
  //sku:FormControl
  constructor(fb: FormBuilder,private userService:UserService) {

   
   

    
    this.arrUsers=userService.getUsers()
    /////////////////
    this.updateUserForm = fb.group({ 
    'id':[0]    ,
    'firstName':['',Validators.required],
    'lastName':['',Validators.required],
    'email':['',Validators.required],
    'password':['',Validators.required],
    'date_of_birth':[new Date(),Validators.required],
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
    console.log('you submitted value: ', updateUserForm);
    console.log(updateUserForm.firstName)
    this.tempAddr=new Address(0,updateUserForm.houseno,updateUserForm.street,updateUserForm.area,updateUserForm.city,updateUserForm.pincode,updateUserForm.country)
    this.tempUser=new User (this.idUpdated,updateUserForm.firstName,updateUserForm.lastName,updateUserForm.email,updateUserForm.password,"user",updateUserForm.date_of_birth,this.tempAddr)
    this.userService.updateUser(this.tempUser)
  }

  onChangeType(evt:any)
  {
    console.log(evt.target.value)

    var idObtained=evt.target.value;
    this.idUpdated=parseInt(idObtained.split(':')[1].trim()); //['1','1']
    console.log("this.idUpdated",this.idUpdated)
    // let user:User=this.userService.getUserById(this.idUpdated)

    this.user=this.userService.getUserById(this.idUpdated);
     this.updateUserForm.get('firstName')?.setValue(this.user.firstName)
      this.updateUserForm.get('lastName')?.setValue(this.user.lastName)
      this.updateUserForm.get('role')?.setValue(this.user.role)
      this.updateUserForm.get('email')?.setValue(this.user.email)
      this.updateUserForm.get('password')?.setValue(this.user.password)
      this.updateUserForm.get('houseno')?.setValue(this.user.address.houseno)
      this.updateUserForm.get('street')?.setValue(this.user.address.street)
      this.updateUserForm.get('area')?.setValue(this.user.address.area)
      this.updateUserForm.get('city')?.setValue(this.user.address.city)
      this.updateUserForm.get('country')?.setValue(this.user.address.country)
      this.updateUserForm.get('pincode')?.setValue(this.user.address.pincode)
    
  }
}
