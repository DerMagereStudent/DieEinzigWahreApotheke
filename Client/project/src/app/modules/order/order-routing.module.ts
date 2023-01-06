import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderModuleComponent } from './order.component';

const routes: Routes = [
  { path: '', component: OrderModuleComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }