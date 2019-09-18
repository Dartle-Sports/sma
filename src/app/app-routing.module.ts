import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListingComponent } from './listing/listing.component';
import { CategorylistingComponent } from './categorylisting/categorylisting.component';
import { ShopProfileComponent } from './shop-profile/shop-profile.component'
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component'
import { RegistrationComponent } from './registration/registration.component';
import { PlandetailsComponent } from './plandetails/plandetails.component';
import { UserprofileBuyerComponent } from './userprofile-buyer/userprofile-buyer.component';
import{ RegistrationSellerComponent } from './registration-seller/registration-seller.component';
import { CartComponent } from './cart/cart.component';
import { from } from 'rxjs';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'listing', component: ListingComponent},
  { path: 'category', component: CategorylistingComponent},
  { path: 'categorylisting', component : CategorylistingComponent},
  { path: 'Login', component: LoginComponent},
  { path: 'SignUp', component: RegistrationComponent},
  { path: 'Plandetails',component:PlandetailsComponent},
  { path: 'Userprofile',component:UserprofileBuyerComponent},
  { path: 'SignupSeller',component:RegistrationSellerComponent},
  { path:'cart', component: CartComponent },
  { path: 'terms&conditions',component: TermsConditionsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),RouterModule.forRoot(routes,{scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
  

})
export class AppRoutingModule { }
