import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicineService } from './services/medicine.service';
import { HttpClientModule } from '@angular/common/http';

// PrimeNg
import {AutoCompleteModule} from 'primeng/autocomplete';
import {PaginatorModule} from 'primeng/paginator';
import {ToolbarModule} from 'primeng/toolbar';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,

    // PrimeNg
    AutoCompleteModule,
    PaginatorModule,
    ToolbarModule
  ],
  exports: [
    // PrimeNg
    AutoCompleteModule,
    PaginatorModule,
    ToolbarModule
  ],
  declarations: [],
  providers: [MedicineService]
})
export class SharedModule { }