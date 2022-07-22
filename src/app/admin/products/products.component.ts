import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/classes/product';
import { ProductService } from 'src/app/shared/services/product.service';


@Component({
	selector: 'admin-products',
	templateUrl: './products.component.html',
	styleUrls: ['./products.component.scss']
})

export class AdminProductsComponent implements OnInit {

	products:Product[] = []

	constructor(private productsService:ProductService) { }

	ngOnInit(): void {
		this.getAllProducts()
	 }

	getAllProducts(){
		this.productsService.getAllProducts().subscribe(res =>{
			this.products = []
			if(res.products){
				this.products = res.products
			}else{
				this.products = []
			}
			for(let i =0;i<this.products.length;i++){
				this.products[i]['ratings'] = 4
			}
		})
	}

}
