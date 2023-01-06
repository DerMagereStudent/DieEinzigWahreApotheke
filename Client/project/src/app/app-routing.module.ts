import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path:'home', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) },
  { path:'cart', loadChildren: () => import('./modules/cart/cart.module').then(m => m.CartModule) },
  { path:'search', loadChildren: () => import('./modules/search/search.module').then(m => m.SearchModule) },
  { path:'user', loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule) },
  { path:'order', loadChildren: () => import('./modules/order/order.module').then(m => m.OrderModule) },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
