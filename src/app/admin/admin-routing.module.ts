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
                path: 'dashboard',
                component: AdminHomeComponent,
            },
            {
                path: 'orders',
                component: AdminOrdersComponent,
                
            },
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AdminRoutingModule { };