import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwlModule } from 'angular-owl-carousel';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminHomeComponent } from './home/admin-home.component';
import { AdminInitComponent } from './initial/admin-initial.component';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminAsideComponent } from './nav/aside/aside.component';
import { AdminNavComponent } from './nav/nav/nav.component';
import { AdminFooterComponent } from './footer/footer.component';


@NgModule( {
	declarations: [
		AdminHomeComponent,
        AdminInitComponent,
		AdminAsideComponent,
		AdminNavComponent,
		AdminFooterComponent
	],

	imports: [
		CommonModule,
		LazyLoadImageModule,
		AdminRoutingModule,
		SharedModule,
		NgbModule,
		OwlModule,
	],

	exports: [
		AdminHomeComponent,
        AdminInitComponent
	],

	providers: [
		NgbModal
	]
} )

export class AdminModule { }
