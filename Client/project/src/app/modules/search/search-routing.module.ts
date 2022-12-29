import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchModuleComponent } from './search.component';
import { DetailComponent } from './components/detail/detail.component';

const routes: Routes = [
  { path: '', component: SearchModuleComponent },
  { path: 'detail', component: DetailComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }