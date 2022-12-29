import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchModuleComponent } from './search.component';
import { ToolbarSearchComponent } from './components/toolbar-search/toolbar-search.component';
import { SharedModule } from '../shared/shared.module';
import { SearchComponent } from './components/search/search.component';
import { SearchRoutingModule } from './search-routing.module';
import { SearchResultItemComponent } from './components/search/components/search-result-item/search-result-item.component';
import { CartModule } from '../cart/cart.module';

@NgModule({
  imports: [
    CommonModule,
    SearchRoutingModule,
    CartModule,
    SharedModule,
  ],
  exports: [
    ToolbarSearchComponent
  ],
  declarations: [
    SearchModuleComponent,
    ToolbarSearchComponent,
    SearchComponent,
    SearchResultItemComponent
  ]
})
export class SearchModule { }
