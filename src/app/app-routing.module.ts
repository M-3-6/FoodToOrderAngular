import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginLogoutComponent } from './components/login-logout/login-logout.component';
import { RestaurantDetailsComponent } from './components/restaurant-details/restaurant-details.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AdminGuard } from './guards/adminguard';
import { AddOrderComponent } from './components/order/add-order/add-order.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';


const routes: Routes = [
  {path: 'aboutus',component:AboutUsComponent},
  { path: 'contactus', component: ContactUsComponent },
  {path: 'restaurants',component:RestaurantComponent},
  {path: 'restaurantdetails/:id',component:RestaurantDetailsComponent},
  {path: 'home',component:HomeComponent},
  {path: 'admin',component:AdminComponent,canActivate : [AdminGuard()]},
  {path: 'loginLogout',component:LoginLogoutComponent},
  {path: 'addorder', component:AddOrderComponent},
  {path:'**' , component:NotFoundComponent}
];

@NgModule({
  // imports: [RouterModule.forRoot(routes,{enableTracing:true})],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
