import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartModuleComponent } from './cart.component';
import { SharedModule } from '../shared/shared.module';
import { AddToCartComponent } from './components/add-to-cart/add-to-cart.component';
import { ToolbarCartComponent } from './components/toolbar-cart/toolbar-cart.component';
import { CartComponent } from './components/cart/cart.component';
import { CartRoutingModule } from './cart-routing.module';
import { CartItemComponent } from './components/cart/components/cart-item/cart-item.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CartRoutingModule
  ],
  exports: [
    AddToCartComponent,
    ToolbarCartComponent
  ],
  declarations: [
    CartModuleComponent,
    AddToCartComponent,
    ToolbarCartComponent,
    CartComponent,
    CartItemComponent,
    CheckoutComponent
  ]
})
export class CartModule { }
