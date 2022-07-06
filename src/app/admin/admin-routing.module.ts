import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminInitComponent } from './initial/admin-initial.component';
import { AdminHomeComponent } from './home/admin-home.component';
import { AdminOrdersComponent } from './orders/orders.component';

const routes: Routes = [
    {
        path: '',
        component: AdminInitComponent,
        children: [
            {
                path: 'home',
                component: AdminHomeComponent,
            },
            {
                path: 'orders',
                component: AdminOrdersComponent,
            },
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
            },
        ]
    },
    
];

@NgModule( {
    imports: [ RouterModule.forRoot( routes, { useHash: false, anchorScrolling: 'disabled', scrollPositionRestoration: 'disabled' } ) ],
	exports: [ RouterModule ]
} )

export class AdminRoutingModule { };