import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {TooltipModule} from 'primeng/tooltip';
import {TableModule} from 'primeng/table';
import {RatingModule} from 'primeng/rating';
import {FileUploadModule} from 'primeng/fileupload';

@NgModule({
  declarations: [],
  exports: [
    HttpClientModule,
    CommonModule,
    
    TooltipModule,
    TableModule,
    RatingModule,
    FileUploadModule
  ],
})
export class PrimeNgModule {}
