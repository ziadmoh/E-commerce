import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminInitComponent } from './initial/admin-initial.component';
import { AdminHomeComponent } from './home/admin-home.component';
import { AdminOrdersComponent } from './orders/orders.component';
import { AdminProductsComponent } from './products/products.component';
import { AdminOrderDetailsComponent } from './order-details/order-details.component';
import { AdminUsersComponent } from './users/users.component';
import { AdminPromocodeComponent } from './promocode/promocode.component';

const routes: Routes = [
    {
        path: '',
        component: AdminInitComponent,
        children: [
            {
                path:'',
                redirectTo:'dashboard',
                pathMatch:'full'
            },
            {
                path: 'dashboard',
                component: AdminHomeComponent,
            },
            
            {
                path: 'orders',
                component: AdminOrdersComponent,
                
            },
            {
                path: 'orders/:orderId',
                component: AdminOrderDetailsComponent,
                
            },
            {
                path: 'products',
                component: AdminProductsComponent,
                
            },
            {
                path: 'users',
                component: AdminUsersComponent,
                
            },
            {
                path: 'promocodes',
                component: AdminPromocodeComponent,
                
            },
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AdminRoutingModule { };