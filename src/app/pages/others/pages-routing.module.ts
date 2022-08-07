import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutOneComponent } from './about-one/about-one.component';
import { AboutTwoPageComponent } from './about-two/about-two.component';
import { LoginPageComponent } from './login/login.component';
import { FaqsPageComponent } from './faqs/faqs.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ContactOnePageComponent } from './contact-one/contact-one.component';
import { ContactTwoPageComponent } from './contact-two/contact-two.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '404',
        pathMatch: 'full'
    },
    {
        path: '404',
        component: PageNotFoundComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PagesRoutingModule { };