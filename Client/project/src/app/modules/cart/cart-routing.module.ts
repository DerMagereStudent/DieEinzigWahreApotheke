import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartModuleComponent } from './cart.component';

const routes: Routes = [
  { path: '', component: CartModuleComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }