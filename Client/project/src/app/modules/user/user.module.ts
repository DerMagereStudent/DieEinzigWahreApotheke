import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserModuleComponent } from './user.component';
import { UserToolbarComponent } from './components/user-toolbar/user-toolbar.component';
import { SharedModule } from '../shared/shared.module';
import { UserSignupComponent } from './components/user-signup/user-signup.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserRoutingModule } from './user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
  ]
})
export class UserModule { }
