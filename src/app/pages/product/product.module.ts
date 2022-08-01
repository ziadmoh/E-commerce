import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LightboxModule } from 'ngx-lightbox';
import { OwlModule } from 'angular-owl-carousel';

import { ProductRoutingModule } from './product-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { ExtendedPageComponent } from './extended/extended.component';

import { GalleryDefaultComponent } from './shared/gallery/gallery-default/gallery-default.component';

import { DetailOneComponent } from './shared/details/detail-one/detail-one.component';

import { InfoOneComponent } from './shared/info-tabs/info-one/info-one.component';

import { RelatedProductsOneComponent } from './shared/related-products/related-products-one/related-products-one.component';
import { RelatedProductsTwoComponent } from './shared/related-products/related-products-two/related-products-two.component';
import { ToggleSidebarComponent } from './shared/toggle-sidebar/toggle-sidebar.component';

@NgModule({
	declarations: [
		ExtendedPageComponent,
		

		GalleryDefaultComponent,
		

		DetailOneComponent,

		InfoOneComponent,
		

		RelatedProductsOneComponent,
		RelatedProductsTwoComponent,
		ToggleSidebarComponent,
	],

	imports: [
		CommonModule,
		ProductRoutingModule,
		SharedModule,
		RouterModule,
		NgbModule,
		OwlModule,
		LightboxModule,
	],

	exports: [],

	providers: [
		NgbModal
	]
})

export class ProductModule { }
