import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SidebarPageComponent } from './sidebar/sidebar.component';
import { NosidebarPageComponent } from './nosidebar/nosidebar.component';
import { MarketPageComponent } from './market/market.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductCategoryBoxedPageComponent } from './product-category-boxed/product-category-boxed.component';
import { ProductCategoryFluidPageComponent } from './product-category-fluid/product-category-fluid.component';
import { CartGuard } from 'src/app/shared/services/cart.guard';
import { CheckOutGuard } from 'src/app/shared/services/checkout.guard';

const routes: Routes = [
	{
		path: 'sidebar/:type',
		component: SidebarPageComponent
	},
	{
		path: 'sidebar',
		pathMatch: 'full',
		redirectTo: 'sidebar/list'
	},
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'sidebar/list'
	},
	{
		path: 'nosidebar/:type',
		component: NosidebarPageComponent
	},
	{
		path: 'nosidebar',
		pathMatch: 'full',
		redirectTo: 'nosidebar/boxed'
	},
	{
		path: 'cart',
		component: CartComponent,
		canActivate:[CartGuard]
	},
	{
		path: 'checkout',
		component: CheckoutComponent, //CartGuard
		canActivate:[CheckOutGuard]
	},
	{
		path: 'orders',
		component: DashboardComponent,
		canActivate:[CartGuard]
	},
];

@NgModule( {
	imports: [ RouterModule.forChild( routes ) ],
	exports: [ RouterModule ]
} )



export class ShopRoutingModule { };