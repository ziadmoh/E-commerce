import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';

import { specialSlider } from '../data';

@Component({
	selector: 'app-ecommerce-special-collection',
	templateUrl: './special-collection.component.html',
	styleUrls: ['./special-collection.component.scss']
})

export class SpecialCollectionComponent implements OnInit {

	products = [];
	onSaleProducts = [];
	loaded = false;

	sliderOption = specialSlider;
	attrs = ['sale', 'rated'];
	titles = {"sale": "On Sale", "rated": "Top Rated" };

	constructor(private productService:ProductService) { 
	}

	ngOnInit(): void {
		//this.getTopRatedProducts()

		this.productService.getAllProducts().subscribe((res:any)=>{
			if(res && res.products){
				this.products = res.products
				this.loaded = true
				//this.getOnSaleProducts(res.products)
				//console.log(this.onSaleProducts)
			}else{
				//this.getOnSaleProducts([])
			}
		})

	}

	getOnSaleProducts(products){
		products.forEach((p) =>{
			if(p.oldPrice){
				if(this.onSaleProducts.length <6){
					this.onSaleProducts.push(p)
				}
			}
		})
	}

	getTopRatedProducts(products){
		products.forEach((p) =>{
			if(p.productRate > 3){
				if(this.onSaleProducts.length <6){
					this.onSaleProducts.push(p)
				}
			}
		})
	}
}
