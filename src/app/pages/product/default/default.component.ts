import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Product } from 'src/app/shared/classes/product';
import { ApiService } from 'src/app/shared/services/api.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
	selector: 'product-default-page',
	templateUrl: './default.component.html',
	styleUrls: ['./default.component.scss']
})

export class DefaultPageComponent implements OnInit {

	product: Product;
	prev: Product;
	next: Product;
	related = [];
	loaded = false;

	constructor(
		public apiService: ApiService,
		private activeRoute: ActivatedRoute,
		public router: Router,
		private productService:ProductService
	) {
		activeRoute.params.subscribe(params => {
			this.loaded = false;
			// this.apiService.getSingleProduct(params['productId']).subscribe(result => {
			// 	if (result === null) {
			// 		this.router.navigate(['/pages/404']);
			// 	}

			// 	this.product = result.product;
			// 	this.prev = result.prevProduct;
			// 	this.next = result.nextProduct;
			// 	this.related = result.relatedProducts;
			// 	this.loaded = true;
			// });
			this.productService.getProductById(params['productId']).subscribe(res =>{
				if (res && res.product) {
					this.product = res.product;
					this.loaded = true;
				}else{
					this.router.navigate(['/pages/404']);
				}
			})
		});
	}

	ngOnInit(): void {
	}
}