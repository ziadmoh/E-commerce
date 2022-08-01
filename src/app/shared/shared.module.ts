import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OwlModule } from 'angular-owl-carousel';
import { LazyLoadImageModule } from 'ng-lazyload-image';

// Header Element
import { CartMenuComponent } from './components/headers/shared/cart-menu/cart-menu.component';
import { CompareMenuComponent } from './components/headers/shared/compare-menu/compare-menu.component';
import { CategoryMenuComponent } from './components/headers/shared/category-menu/category-menu.component';
import { HeaderSearchComponent } from './components/headers/shared/header-search/header-search.component';
import { MobileButtonComponent } from './components/headers/shared/mobile-button/mobile-button.component';
import { MobileMenuComponent } from './components/headers/shared/mobile-menu/mobile-menu.component';

// Header Component
import { HeaderComponent } from './components/headers/header/header.component';

// // Product Component
import { ProductNineComponent } from './components/product/product-nine/product-nine.component';
import { ProductElevenComponent } from './components/product/product-eleven/product-eleven.component';

// Footer Component
import { FooterComponent } from './components/footer/footer.component';
// // Page Element
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { CardComponent } from './components/accordion/card/card.component';
import { AccordionComponent } from './components/accordion/accordion.component';

// Product Element
import { QuantityInputComponent } from './components/quantity-input/quantity-input.component';
import { CountDownComponent } from './components/count-down/count-down.component';
import { CountToComponent } from './components/count-to/count-to.component';

// // single use component
import { QuickViewComponent } from './components/modals/quick-view/quick-view.component';
import { QuickViewTwoComponent } from './components/modals/quick-view-two/quick-view-two.component';
import { VideoModalComponent } from './components/modals/video-modal/video-modal.component';
import { LoginModalComponent } from './components/modals/login-modal/login-modal.component';
import { IsotopeGridComponent } from './components/isotope-grid/isotope-grid.component';
import { ImageComponent } from './components/image/image.component';

// // Custom Directives
import { BgParallaxDirective } from './directives/bg-parallax.directive';
import { TabClickDirective } from './directives/custom-tab-click.directive';
import { ProductHoverDirective } from './directives/product-hover.directive';
import { ContentAnimDirective } from './directives/content-anim.directive';

// Pipes
import { CatFilterPipe } from './pipes/cat-filter.pipe';
import { AttrFilterPipe } from './pipes/attr-filter.pipe';
import { SafeContentPipe } from './pipes/safe-content.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChildDataModalComponent } from './components/modals/child-data-modal/child-data-modal.component';
import { PrimeNgModule } from './modules/prime-ng.module';

// PerfectScrollBar
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar'
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollY: true,

};



@NgModule({
	declarations: [
		// header
		CartMenuComponent,
		CompareMenuComponent,
		CategoryMenuComponent,
		HeaderSearchComponent,
		MobileButtonComponent,
		MobileMenuComponent,

		HeaderComponent,
		FooterComponent,

		// product
		ProductNineComponent,
		ProductElevenComponent,

		// single-use components
		BreadcrumbComponent,
		PageHeaderComponent,
		QuickViewComponent,
		QuickViewTwoComponent,
		LoginModalComponent,
		VideoModalComponent,
		QuantityInputComponent,
		CountDownComponent,
		AccordionComponent,
		CardComponent,
		PaginationComponent,
		IsotopeGridComponent,
		ImageComponent,
		ChildDataModalComponent,

		// directives
		BgParallaxDirective,
		TabClickDirective,
		ProductHoverDirective,
		ContentAnimDirective,

		// pipes
		CatFilterPipe,
		AttrFilterPipe,
		SafeContentPipe,
		CountDownComponent,

		CountToComponent,

	],

	imports: [
		CommonModule,
		RouterModule,
		NgbModule,
		TranslateModule,
		OwlModule,
		LazyLoadImageModule,
		FormsModule,
		ReactiveFormsModule,
		PrimeNgModule,
		
		//PerfectScrollbar
		PerfectScrollbarModule
	],

	exports: [
		// header
		HeaderComponent,

		// mobile-menus
		MobileMenuComponent,

		// footer
		FooterComponent,

		// products
		ProductNineComponent,
		ProductElevenComponent,

		// // single-use components
		BreadcrumbComponent,
		PageHeaderComponent,
		CountDownComponent,
		CountToComponent,
		AccordionComponent,
		CardComponent,
		PaginationComponent,
		QuantityInputComponent,
		IsotopeGridComponent,
		ImageComponent,

		// directives
		BgParallaxDirective,
		TabClickDirective,
		ProductHoverDirective,
		ContentAnimDirective,

		// pipes
		CatFilterPipe,
		AttrFilterPipe,
		SafeContentPipe,

	],

	entryComponents: [
		VideoModalComponent,
		QuickViewComponent,
		QuickViewTwoComponent,
		LoginModalComponent
	],
	providers: [
		{
		  provide: PERFECT_SCROLLBAR_CONFIG,
		  useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
		}
	  ],
})

export class SharedModule { }