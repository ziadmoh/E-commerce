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
	}

	ngOnInit(): void {
		this.productService.getAllProducts().subscribe(res =>{
			if(res && res.products){
				this.products = res.products;
				this.loaded = true;
			}else{
				this.products = []
			}
		})
		if(this.modalSerice.isLoginModalRequired == true){
			this.modalSerice.showLoginModal();
		}

	}
}
