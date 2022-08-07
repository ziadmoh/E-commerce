import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {TooltipModule} from 'primeng/tooltip';
import {TableModule} from 'primeng/table';
import {RatingModule} from 'primeng/rating';
import {FileUploadModule} from 'primeng/fileupload';
import {PaginatorModule} from 'primeng/paginator';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import {InputNumberModule} from 'primeng/inputnumber';
import {CalendarModule} from 'primeng/calendar';

@NgModule({
  declarations: [],
  exports: [
    HttpClientModule,
    CommonModule,
    
    TooltipModule,
    TableModule,
    RatingModule,
    FileUploadModule,
    PaginatorModule,
    DynamicDialogModule,
    DialogModule,
    DropdownModule,
    InputNumberModule,
    CalendarModule
  ],
})
export class PrimeNgModule {}
