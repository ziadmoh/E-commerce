import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExtendedPageComponent } from './extended/extended.component';

const routes: Routes = [
    {
        path: ':productId',
        component: ExtendedPageComponent
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ProductRoutingModule { };