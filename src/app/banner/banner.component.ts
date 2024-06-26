import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { Order } from '../models/order';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../services/cart.service';
import { Cart } from '../models/cart';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss',
})
export class BannerComponent {
  loginForm: FormGroup;

  validUser: boolean = true;

  arrUsers: User[] = [];

  username: string;

  count: number = 0;
  userId: string = '';

  constructor(
    private fb: FormBuilder,
    private userservice: UserService,
    private router: Router,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private cartService: CartService
  ) {
    this.userservice.getUsers().subscribe((data) => {
      this.arrUsers = data;
    });

    const storedUsername = localStorage.getItem('username');
    this.username = storedUsername ? storedUsername : '';

    let userId = localStorage.getItem('userId');
    if (userId) {
      this.cartService.getCartById(userId.toString()).subscribe((data) => {
        
      //  // let currCount = 0;
      //   // for (let qty of data.quantity) {
      //   //   currCount += qty;
      //   // }
      //   this.count = data.cartDishes.length;
      //   //this.count = data.arrDishes.length;
      //   localStorage.setItem('cartCount', this.count.toString());

      
      let currCount = 0;
        data.cartDishes.forEach((cd)=>{
          currCount+=cd.quantity;
        })
        this.count=currCount;

        localStorage.setItem('cartCount', this.count.toString());
      });
    }

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  verifyCredentials(email: HTMLInputElement, pwd: HTMLInputElement) {
    if (this.loginForm.valid) {
      this.userservice.getUsers().subscribe((users) => {
        const user = users.find(
          (u) => u.email === email.value && u.password === pwd.value
        );
        if (user) {
          localStorage.setItem('userId', user.id.toString());

          var loginSuccess = false;
          var isAdmin = false;
          var isUser = false;
          if (user.role === 'admin') {
            localStorage.setItem('role', 'admin');
            // window.location.reload();
            isAdmin = true;
            console.log('Admin is welcome');
            loginSuccess = true;
          } else if (user.role === 'user') {
            localStorage.setItem('role', 'user');
            // window.location.reload();
            isUser = true;
            console.log('User is welcome');
            loginSuccess = true;
          }
          if (loginSuccess) {
            localStorage.setItem('username', user.firstName);
            const storedUsername = localStorage.getItem('username');
            this.username = storedUsername ? storedUsername : '';
            this.messageService.add({
              key: 'tr',
              severity: 'success',
              summary: 'Success',
              detail: 'Login successful!',
            });
          }
          //  window.location.reload();
          if (isAdmin) {
            this.router.navigate(['/admin']);
            document.getElementById('ModalClose')?.click();
          } else if (isUser) {
            this.router.navigate(['/home']);
            document.getElementById('ModalClose')?.click();
          }
        } else {
          this.validUser = false;
          console.log('Sorry wrong credentials... Please try again!');
          // this.router.navigate(['/home']);
        }
      });

      // window.location.reload();
    } else {
      this.markFormGroupTouched(this.loginForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
    });
  }

  LoggedIn() {
    if (localStorage.getItem('role') != null) {
      return true;
    }
    return false;
  }

  Logout() {
    localStorage.clear();
    this.router.navigate(['/home']);
    window.location.reload();
  }

  isAdmin() {
    if (localStorage.getItem('role') == 'admin') return true;
    else return false;
  }
}
