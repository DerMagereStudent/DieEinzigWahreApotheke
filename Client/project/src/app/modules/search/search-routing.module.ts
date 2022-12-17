import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchModuleComponent } from './search.component';

const routes: Routes = [
  { path: '', component: SearchModuleComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }