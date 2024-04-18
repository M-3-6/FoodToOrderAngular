import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})


export class BannerComponent {

  arrUsers:User[]

    constructor(private userservice:UserService,private router:Router){
      this.arrUsers = this.userservice.getUsers()
    }
    verifyCredentials(email:HTMLInputElement, pwd: HTMLInputElement){
      // console.log(email.value+" , "+pwd.value);
      // if(email.value=="john@gmail.com" && pwd.value=="john@12"){
      //   console.log("Admin is welcome")
      //   localStorage.setItem("role","admin")
      //   console.log(localStorage.getItem("role"))
      //   this.router.navigate(['/admin']);
      // }
      // else if(email.value=="jane@gmail.com" && pwd.value=="jane@12"){
      //   localStorage.setItem("role","user")
      //   console.log(localStorage.getItem("role"))
      // }
      // else{
      //   console.log("Sorry wrong credentials... Please try again!")
      //   this.router.navigate(['/home']);
      // }

      for(var i=0;i<this.arrUsers.length;i++){
        if(email.value==this.arrUsers[i].email && pwd.value == this.arrUsers[i].password  && this.arrUsers[i].role=='admin'){
          console.log("Admin is welcome")
            localStorage.setItem("role","admin")
           // console.log(localStorage.getItem("role"))
           localStorage.setItem("userId",this.arrUsers[i].id.toString())
            this.router.navigate(['/admin']);
        }
        else if(email.value==this.arrUsers[i].email && pwd.value == this.arrUsers[i].password){
          
            localStorage.setItem("role","user")
           // console.log(localStorage.getItem("role"))
           localStorage.setItem("userId",this.arrUsers[i].id.toString())
            this.router.navigate(['/home']);
        }
        else{
          console.log("Sorry wrong credentials... Please try again!")
          this.router.navigate(['/home']);
        }
    }
}
}
