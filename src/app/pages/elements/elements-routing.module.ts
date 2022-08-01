import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ElementsListComponent } from './shared/elements-list/elements-list.component';
import { TitlesPageComponent } from './titles/title.component';
import { TypographyPageComponent } from './typography/typography.component';
import { BannersPageComponent } from './banners/banner.component';
import { ProductCategoryPageComponent } from './product-category/product-category.component';
import { VideoBannerPageComponent } from './video-banner/video-banner.component';
import { ButtonsPageComponent } from './buttons/button.component';
import { AccordionsPageComponent } from './accordions/accordion.component';
import { TabsPageComponent } from './tabs/tab.component';
import { TestimonialPageComponent } from './testimonials/testimonial.component';
import { CallToActionPageComponent } from './call-to-action/call-to-action.component';
import { IconBoxesPageComponent } from './icon-boxes/icon-box.component';
import { ElementsListPageComponent } from './elements-list/elements-list.component';

const routes: Routes = [
    {
        path: '',
        component: ElementsListComponent,
        children: [
            {
                path: '',
                component: ElementsListPageComponent
            }
        ]
    }
];

@NgModule( {
    imports: [ RouterModule.forChild( routes ) ],
    exports: [ RouterModule ]
} )

export class ElementsRoutingModule { };