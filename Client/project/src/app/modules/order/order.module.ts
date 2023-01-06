import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderModuleComponent } from './order.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { SharedModule } from '../shared/shared.module';
import { ToolbarAllOrdersComponent } from './components/toolbar-all-orders/toolbar-all-orders.component';
import { AllOrdersComponent } from './components/all-orders/all-orders.component';
import { OrderRoutingModule } from './order-routing.module';
import { AllOrdersItemComponent } from './components/all-orders/components/all-orders-item/all-orders-item.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    OrderRoutingModule
  ],
  exports: [
    CheckoutComponent,
    ToolbarAllOrdersComponent
  ],
  declarations: [
    OrderModuleComponent,
    CheckoutComponent,
    ToolbarAllOrdersComponent,
    AllOrdersComponent,
    AllOrdersItemComponent,
  ]
})
export class OrderModule { }
