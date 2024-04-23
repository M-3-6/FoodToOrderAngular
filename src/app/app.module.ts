import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BannerComponent } from './banner/banner.component';
import { ContentComponent } from './content/content.component';
import { FooterComponent, SecondComponent } from './footer/footer.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { LoginLogoutComponent } from './components/login-logout/login-logout.component';
import { RestaurantDetailsComponent } from './components/restaurant-details/restaurant-details.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RestaurantService } from './services/restaurantService';
import { DishService } from './services/dish.service';
import { UserService } from './services/user.service';
import { CartComponent } from './components/cart/cart.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';

import { ViewUserComponent } from './components/user/view-user/view-user.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddUser2Component } from './components/user/add-user2/add-user2.component';
import { UpdateUser2Component } from './components/user/update-user2/update-user2.component';
import { AddRestaurantComponent } from './components/AdminRestaurant/add-restaurant/add-restaurant.component';

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';

import{HttpClientModule} from '@angular/common/http';
import { AddOrderComponent } from './components/order/add-order/add-order.component';
import { UpdateOrderComponent } from './components/order/update-order/update-order.component';
import { ViewOrderComponent } from './components/order/view-order/view-order.component'

import {MatRadioModule} from '@angular/material/radio';
import { UpdateRestaurantComponent } from './components/AdminRestaurant/update-restaurant/update-restaurant.component';
import { ViewRestaurantsComponent } from './components/AdminRestaurant/view-restaurants/view-restaurants.component';

import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { MessageService } from 'primeng/api';


@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
    ContentComponent,
    FooterComponent,
    RestaurantComponent,
    AboutUsComponent,
    AdminComponent,
    HomeComponent,
    LoginLogoutComponent,
    RestaurantDetailsComponent,
    SecondComponent,
    NotFoundComponent,
    CartComponent,
  
    ViewUserComponent,
  
    AddUser2Component,
    UpdateUser2Component,
    AddRestaurantComponent,
   
    UpdateOrderComponent,
    ViewOrderComponent,
    AddOrderComponent,
    UpdateRestaurantComponent,
    ViewRestaurantsComponent

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTabsModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatStepperModule,
  
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,

    HttpClientModule,

    MatRadioModule,
    ToastModule,
    ButtonModule,
    RippleModule,
  ],
  providers: [RestaurantService,DishService,UserService, provideAnimationsAsync(),MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
