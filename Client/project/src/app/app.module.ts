import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchModule } from './modules/search/search.module';
import { SharedModule } from './modules/shared/shared.module';
import { UserModule } from './modules/user/user.module';
import { CartModule } from './modules/cart/cart.module';
import { UserService } from './modules/shared/services/user.service';
import { MedicineService } from './modules/shared/services/medicine.service';
import { CartService } from './modules/shared/services/cart.service';
import { MessageService } from 'primeng/api';
import { OrderService } from './modules/shared/services/order.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  exports: [
    CartModule,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CartModule,
    SearchModule,
    SharedModule,
    UserModule
  ],
  providers: [
    CartService,
    MedicineService,
    OrderService,
    UserService,
    MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
