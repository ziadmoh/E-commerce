import { Component, OnInit } from '@angular/core';

import { ModalService } from 'src/app/shared/services/modal.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

import { introSlider, brandSlider } from '../data';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
	selector: 'app-ecommerce-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss']
})

export class IndexComponent implements OnInit {

	products = [];
	posts = [];
	loaded = false;
	introSlider = introSlider;
	brandSlider = brandSlider;

	constructor(public apiService: ApiService, 
		public utilsService: UtilsService, 
		private modalService: ModalService,
		private productService:ProductService,
		private modalSerice:ModalService) {

		this.apiService.fetchHomeData().subscribe(result => {
			this.products = result.products;
			this.loaded = true;
		})
	}

	ngOnInit(): void {
		this.productService.getAllProducts().subscribe(res =>{
			console.log(res)
		})
		if(this.modalSerice.isLoginModalRequired == true){
			this.modalSerice.showLoginModal();
		}

	}
}
