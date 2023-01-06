import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserModuleComponent } from './user.component';
import { UserSignupComponent } from './components/user-signup/user-signup.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserOrdersComponent } from './components/user-orders/user-orders.component';
import { UserInfoComponent } from './components/user-info/user-info.component';

const routes: Routes = [
  { path: '', component: UserModuleComponent, children: [
    { path: 'signup', component: UserSignupComponent },
    { path: 'login', component: UserLoginComponent },
    { path: 'profile', component: UserProfileComponent, children: [
      { path: 'info', component: UserInfoComponent },
      { path: 'orders', component: UserOrdersComponent },
    ]},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }