import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import {Observable} from "rxjs";
import { Order } from '../models/order';
import { MessageService, PrimeNGConfig } from 'primeng/api';


@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})


export class BannerComponent {

  arrUsers:Observable<User[]>

    constructor(private userservice:UserService,private router:Router,private messageService: MessageService,private primengConfig: PrimeNGConfig){
      this.arrUsers = this.userservice.getUsers()
    }


    verifyCredentials(email:HTMLInputElement, pwd: HTMLInputElement){

      this.userservice.getUsers().subscribe(users => {
        const user = users.find(u => u.email === email.value && u.password === pwd.value);
        if (user) {

          localStorage.setItem('userId', user.id.toString());

          var loginSuccess=false;
          var isAdmin = false;
          var isUser = false;
          if (user.role === 'admin') {
            localStorage.setItem('role', 'admin');
           window.location.reload();
            isAdmin = true;
            console.log('Admin is welcome');
            loginSuccess = true;
            

          } else if (user.role === 'user'){
            localStorage.setItem('role', 'user');
            window.location.reload();
           isUser = true;
            console.log('User is welcome');
            loginSuccess = true;
          }
          if(loginSuccess){
            this.messageService.add({
              key: 'tr',
              severity: 'success',
              summary: 'Success',
              detail: 'Login successful!',
              
          });
          }
        //  window.location.reload();
          if(isAdmin){
            this.router.navigate(['/admin']);
          }
          else if(isUser){
            this.router.navigate(['/home']);
          }
        } 

        else{
          console.log("Sorry wrong credentials... Please try again!")
          this.router.navigate(['/home']);
        }
      });

     // window.location.reload();
}

LoggedIn(){
  if(localStorage.getItem('role')!=null){
    return true;
  }
  return false;
}

Logout(){
  localStorage.clear()
  this.router.navigate(['/home']);
  window.location.reload();
}

}
