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
	color = '';
	minPrice:0;
	maxPrice:0;

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
			} else {
				this.category = '';
			}

			if (params['color']) {
				this.color = params['color'];
			} else {
				this.color = '';
			}

			if (params['minPrice']) {
				this.minPrice = params['minPrice'];
			} else {
				this.minPrice = 0;
			}

			if (params['maxPrice']) {
				this.maxPrice = params['maxPrice'];
			} else {
				this.maxPrice = 0;
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
							return product['box'] = 1
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
			}else if (this.category && this.category =='other_products'){
				this.totalCount = this.productService.normalProductsLength
				this.productService.getOther_productsProducts().subscribe((result:any) => {
					if(result.normalProducts){
						this.products = this.productService.other_productsProducts;
					}else{
						this.products = []
					}
					
	
					this.loaded = true;
					if (!this.firstLoad) {
						this.firstLoad = true;
					}
	
					this.utilsService.scrollToPageContent();
				})
			}else if (this.searchTerm){

				this.productService.searchProduct(this.searchTerm).subscribe((res:any) =>{
					if(res && res.searchResult){
						this.products = res.searchResult
					}else{
						this.products = []
					}
					this.loaded = true;
					if (!this.firstLoad) {
						this.firstLoad = true;
					}
	
					this.utilsService.scrollToPageContent();
				})

			}else if (this.color){

				this.productService.searchByColor(this.color).subscribe((res:any) =>{
					if(res && res.products){
						this.products = res.products
					}else{
						this.products = []
					}
					this.loaded = true;
					if (!this.firstLoad) {
						this.firstLoad = true;
					}
	
					this.utilsService.scrollToPageContent();
				})

			}else if (this.minPrice  ){

				this.productService.searchInRange(this.minPrice,this.maxPrice).subscribe((res:any) =>{
					if(res && res.products){
						this.products = res.products
					}else{
						this.products = []
					}
					this.loaded = true;
					if (!this.firstLoad) {
						this.firstLoad = true;
					}
	
					this.utilsService.scrollToPageContent();
				})

			}else if(this.orderBy == 'rating' ){
				this.productService.sortByRate().subscribe((res:any) =>{
					if(res && res.products){
						this.products = res.products
					}else{
						this.products = []
					}
					this.loaded = true;
					if (!this.firstLoad) {
						this.firstLoad = true;
					}
	
					this.utilsService.scrollToPageContent();
				})
			} else{
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
		this.router.navigate([], { queryParams: {orderBy: event.currentTarget.value, page: 1 ,category:null,color:null,maxPrice:null,minPrice:null, }, queryParamsHandling: 'merge' });
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