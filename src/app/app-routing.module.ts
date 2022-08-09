import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './shared/layout/layout.component';
import { ComingSoonPageComponent } from './pages/others/coming-soon/coming-soon.component';
import { IndexComponent } from './pages/home/index/index.component';
import { AdminInitComponent } from './admin/initial/admin-initial.component';
import { AdminHomeComponent } from './admin/home/admin-home.component';
import { AdminGuard } from './admin/admin.guard';

const routes: Routes = [
	{
		path: 'pages/coming-soon',
		component: ComingSoonPageComponent
	},
	{
		path: '',
		component: LayoutComponent,
		children: [
			{
				path: '',
				pathMatch: 'full',
				component: IndexComponent
			},
			{
				path: 'elements',
				loadChildren: () => import( './pages/elements/elements.module' ).then( m => m.ElementsModule )
			},
			{
				path: 'pages',
				loadChildren: () => import( './pages/others/pages.module' ).then( m => m.PagesModule )
			},
			{
				path: 'shop',
				loadChildren: () => import( './pages/shop/shop.module' ).then( m => m.ShopModule )
			},
			{
				path: 'product',
				loadChildren: () => import( './pages/product/product.module' ).then( m => m.ProductModule )
			},
		]
	},
	{
		path: 'admin',
		loadChildren: () => import( './admin/admin.module' ).then( m => m.AdminModule ),
		//canActivate: [AdminGuard],
	},
	{
		path: '**',
		redirectTo: '/pages/404'
	}
];


@NgModule( {
	imports: [ RouterModule.forRoot( routes, { useHash: false, anchorScrolling: 'disabled', scrollPositionRestoration: 'disabled' } )],
	exports: [ RouterModule ]
} )

export class AppRoutingModule { }