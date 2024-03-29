import { Component, HostListener, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { filter, first } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Store } from '@ngrx/store';

import { StoreService } from './core/store/store.service';
import { UtilsService } from './shared/services/utils.service';

import { RefreshStoreAction } from 'src/app/core/actions/actions';
import { environment } from 'src/environments/environment';
import { AuthService } from './shared/services/auth.service';
import { ProductService } from './shared/services/product.service';

declare var $: any;

@Component({
	selector: 'app-ecommerce-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{

	constructor(
		public store: Store<any>,
		public router: Router,
		public viewPort: ViewportScroller,
		public storeService: StoreService,
		public utilsService: UtilsService,
		public modalService: NgbModal,
		private authService:AuthService,
		private productService:ProductService
	) {
		const navigationEnd = this.router.events.pipe(
			filter(event => event instanceof NavigationEnd)
		);

		navigationEnd.pipe(first()).subscribe(() => {
			document.querySelector('body')?.classList.add('loaded');
			var timer = setInterval(() => {
				if( window.getComputedStyle( document.querySelector('body') ).visibility == 'visible') {
					clearInterval(timer);
					$('.owl-carousel').trigger('refresh.owl.carousel');
				}
			}, 300);
		});

		navigationEnd.subscribe((event: any) => {
			if (!event.url.includes('/shop/sidebar') && !event.url.includes('/shop/nosidebar') && !event.url.includes('/shop/market')) {
				this.viewPort.scrollToPosition([0, 0]);
			}

			this.modalService.dismissAll();
		})

		if (localStorage.getItem("app-ecommerce-angular-demo") !== environment.demo) {
			this.store.dispatch(new RefreshStoreAction());
		}

		localStorage.setItem("app-ecommerce-angular-demo", environment.demo);
	}
	ngOnInit() {
		this.productService.getBoxProductsLength().subscribe();
		this.productService.getNormalProductsLength().subscribe();
	}

	@HostListener('window: scroll', ['$event'])
	onWindowScroll(e: Event) {
		this.utilsService.setStickyHeader();
	}

	hideMobileMenu() {
		document.querySelector('body').classList.remove('mmenu-active');
		document.querySelector('html').style.overflowX = 'unset';
	}
}