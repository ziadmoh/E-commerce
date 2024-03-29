import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwlModule } from 'angular-owl-carousel';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminHomeComponent } from './home/admin-home.component';
import { AdminInitComponent } from './initial/admin-initial.component';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminAsideComponent } from './nav/aside/aside.component';
import { AdminNavComponent } from './nav/nav/nav.component';
import { AdminFooterComponent } from './footer/footer.component';
import { PrimeNgModule } from '../shared/modules/prime-ng.module';
import { AdminProductsComponent } from './products/products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminOrdersComponent } from './orders/orders.component';
import { AdminOrderDetailsComponent } from './order-details/order-details.component';
import { AdminUsersComponent } from './users/users.component';
import { AdminPromocodeComponent } from './promocode/promocode.component';
import { AdminOrderChildrenComponent } from './order-children/order-children.component';
import { AdminDeliveryFeesComponent } from './delivery-fees/delivery-fees.component';


@NgModule( {
	declarations: [
		AdminHomeComponent,
        AdminInitComponent,
		AdminAsideComponent,
		AdminOrdersComponent,
		AdminNavComponent,
		AdminFooterComponent,
		AdminProductsComponent,
		AdminOrderDetailsComponent,
		AdminUsersComponent,
		AdminPromocodeComponent,
		AdminOrderChildrenComponent,
		AdminDeliveryFeesComponent
	],

	imports: [
		CommonModule,
		LazyLoadImageModule,
		FormsModule,
		ReactiveFormsModule,
		AdminRoutingModule,
		SharedModule,
		NgbModule,
		OwlModule,
		PrimeNgModule
	],

	exports: [
		AdminHomeComponent,
        AdminInitComponent
	],

	providers: [
		
	]
} )

export class AdminModule { }
