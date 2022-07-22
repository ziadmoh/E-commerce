import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from 'src/app/shared/services/api.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
	selector: 'shop-sidebar-page',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss'],
})

export class SidebarPageComponent implements OnInit {
	products = [];
	perPage = 12;
	type = 'list';
	totalCount = 0;
	orderBy = 'default';
	pageTitle = 'List';
	toggle = false;
	searchTerm = '';
	loaded = false;
	firstLoad = false;
	category = '';

	constructor(public activeRoute: ActivatedRoute, 
		public router: Router, 
		public utilsService: UtilsService, 
		public apiService: ApiService,
		public productService:ProductService) {
		this.activeRoute.params.subscribe(params => {
			this.type = params['type'];
			if (this.type == 'list') {
				this.pageTitle = 'List';
			} else if (this.type == '4cols') {
				this.pageTitle = 'Grid 4 Columns';
			}
		});
		
		this.activeRoute.queryParams.subscribe(params => {
			this.loaded = false;

			if (params['searchTerm']) {
				this.searchTerm = params['searchTerm'];
			} else {
				this.searchTerm = '';
			}
			if (params['category']) {
				this.category = params['category'];
			} 

			if (params['orderBy']) {
				this.orderBy = params['orderBy'];
			} else {
				this.orderBy = 'default';
			}

			if(this.category && this.category =='boxes' ){
				this.totalCount = this.productService.boxProductsLength
				this.productService.getBoxProducts().subscribe((result:any) => {
					if(result.boxProducts){
						this.products = this.productService.boxProducts;
						this.products.map((product)=>{
							return product['box'] = 0
						})
					}else{
						this.products = []
					}
	
					this.loaded = true;
					if (!this.firstLoad) {
						this.firstLoad = true;
					}
	
					this.utilsService.scrollToPageContent();
				})
			}else if (this.category && this.category =='singly'){
				this.totalCount = this.productService.normalProductsLength
				this.productService.getSinglyProducts().subscribe((result:any) => {
					if(result.normalProducts){
						this.products = this.productService.singlyProducts;
					}else{
						this.products = []
					}
					
	
					this.loaded = true;
					if (!this.firstLoad) {
						this.firstLoad = true;
					}
	
					this.utilsService.scrollToPageContent();
				})
			}else{
				this.productService.getAllProducts().subscribe((result:any) => {
					if(result.products){
						this.products = this.productService.allProducts;
					}else{
						this.products = []
					}
					
					this.totalCount = this.productService.allProducts.length;
	
					this.loaded = true;
					if (!this.firstLoad) {
						this.firstLoad = true;
					}
	
					this.utilsService.scrollToPageContent();
				})
			}

			
		})
	}

	ngOnInit(): void {
		if (window.innerWidth > 991) this.toggle = false;
		else this.toggle = true;
	}

	@HostListener('window: resize', ['$event'])
	onResize(event: Event) {
		if (window.innerWidth > 991) this.toggle = false;
		else this.toggle = true;
	}

	changeOrderBy(event: any) {
		this.router.navigate([], { queryParams: { orderBy: event.currentTarget.value, page: 1 }, queryParamsHandling: 'merge' });
	}

	toggleSidebar() {
		if (document.querySelector('body').classList.contains('sidebar-filter-active'))
			document.querySelector('body').classList.remove('sidebar-filter-active');
		else
			document.querySelector('body').classList.add('sidebar-filter-active');
	}

	hideSidebar() {
		document.querySelector('body').classList.remove('sidebar-filter-active');
	}
}