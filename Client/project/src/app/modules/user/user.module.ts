import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserModuleComponent } from './user.component';
import { UserToolbarComponent } from './components/user-toolbar/user-toolbar.component';
import { SharedModule } from '../shared/shared.module';
import { UserSignupComponent } from './components/user-signup/user-signup.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserRoutingModule } from './user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserOrdersComponent } from './components/user-orders/user-orders.component';
import { UserOrderComponent } from './components/user-orders/components/user-order/user-order.component';
import { UserOrderItemComponent } from './components/user-orders/components/user-order-item/user-order-item.component';
import { UserInfoComponent } from './components/user-info/user-info.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    UserRoutingModule
  ],
  exports: [
    UserToolbarComponent
  ],
  declarations: [
    UserModuleComponent,
    UserToolbarComponent,
    UserSignupComponent,
    UserLoginComponent,
    UserProfileComponent,
    UserOrdersComponent,
    UserOrderComponent,
    UserOrderItemComponent,
    UserInfoComponent
  ]
})
export class UserModule { }
