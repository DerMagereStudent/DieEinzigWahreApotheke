import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicineService } from './services/medicine.service';
import { UserService } from './services/user.service';
import { HttpClientModule } from '@angular/common/http';

// PrimeNg
import {AutoCompleteModule} from 'primeng/autocomplete';
import {ButtonModule} from 'primeng/button';
import {CalendarModule} from 'primeng/calendar';
import {CardModule} from 'primeng/card';
import {CheckboxModule} from 'primeng/checkbox';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import {FileUploadModule} from 'primeng/fileupload';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextModule} from 'primeng/inputtext';
import {MenuModule} from 'primeng/menu';
import {MultiSelectModule} from 'primeng/multiselect';
import {PaginatorModule} from 'primeng/paginator';
import {PanelModule} from 'primeng/panel';
import {ProgressBarModule} from 'primeng/progressbar';
import {SliderModule} from 'primeng/slider';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import { MessageService } from 'primeng/api';
import { CartService } from './services/cart.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,

    // PrimeNg
    AutoCompleteModule,
    ButtonModule,
    CalendarModule,
    CardModule,
    CheckboxModule,
    ContextMenuModule,
    DialogModule,
    DropdownModule,
    FileUploadModule,
    InputNumberModule,
    InputTextModule,
    MenuModule,
    MultiSelectModule,
    PaginatorModule,
    PanelModule,
    ProgressBarModule,
    SliderModule,
    TableModule,
    ToastModule,
    ToolbarModule,
  ],
  exports: [
    // PrimeNg
    AutoCompleteModule,
    ButtonModule,
    CalendarModule,
    CardModule,
    CheckboxModule,
    ContextMenuModule,
    DialogModule,
    DropdownModule,
    FileUploadModule,
    InputNumberModule,
    InputTextModule,
    MenuModule,
    MultiSelectModule,
    PaginatorModule,
    PanelModule,
    ProgressBarModule,
    SliderModule,
    TableModule,
    ToastModule,
    ToolbarModule,
  ],
  declarations: [],
  providers: [
  ]
})
export class SharedModule { }