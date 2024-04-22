import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import {Observable} from "rxjs";


@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})


export class BannerComponent {

  arrUsers:Observable<User[]>

    constructor(private userservice:UserService,private router:Router){
      this.arrUsers = this.userservice.getUsers()
    }
    verifyCredentials(email:HTMLInputElement, pwd: HTMLInputElement){
      
      this.userservice.getUsers().subscribe(users => {
        const user = users.find(u => u.email === email.value && u.password === pwd.value);
        if (user) {

          localStorage.setItem('userId', user.id.toString());

          if (user.role === 'admin') {
            localStorage.setItem('role', 'admin');
            this.router.navigate(['/admin']);
            console.log('Admin is welcome');

          } else if (user.role === 'user'){
            localStorage.setItem('role', 'user');
            this.router.navigate(['/home']);
          }
        } 

        else{
          console.log("Sorry wrong credentials... Please try again!")
          this.router.navigate(['/home']);
        }
      });

      window.location.reload();

  }

  isLoggedIn() {
    if (localStorage.getItem('role') != null && localStorage.getItem('userId') != null) return true;
    else return false;
  }

  logoutUser() {
    localStorage.clear();
    window.location.reload();
  }
}
