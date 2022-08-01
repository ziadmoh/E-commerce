import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from 'src/app/shared/classes/product';

import { ModalService } from 'src/app/shared/services/modal.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { CompareService } from 'src/app/shared/services/compare.service';

import { environment } from 'src/environments/environment';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
	selector: 'app-ecommerce-product-eleven',
	templateUrl: './product-eleven.component.html',
	styleUrls: ['./product-eleven.component.scss']
})

export class ProductElevenComponent implements OnInit {

	@Input() product: Product;

	maxPrice = 0;
	minPrice = 99999;

	SERVER_URL = environment.SERVER_URL;
	authService: any;
	newCartService: any;

	constructor(
		private router: Router,
		private modalService: ModalService,
		private cartService: CartService,
		private compareService: CompareService,
		private productService:ProductService
	) { }

	ngOnInit(): void {
		// let min = this.minPrice;
		// let max = this.maxPrice;

		// this.product.variants.map(item => {
		// 	if (min > item.price) min = item.price;
		// 	if (max < item.price) max = item.price;
		// }, []);

		// if (this.product.variants.length == 0) {
		// 	min = this.product.sale_price
		// 		? this.product.sale_price
		// 		: this.product.price;
		// 	max = this.product.price;
		// }

		// this.minPrice = min;
		// this.maxPrice = max;
	}

	addToCart(event: Event) {
		event.preventDefault();
		if(this.authService.isLoggedIn){
			this.authService.newUser.subscribe(user =>{
				this.newCartService.openSession(user.userId).subscribe((res:any) =>{
				//	console.log(res)
					if(res.session && res.session.sessionId){
						this.newCartService.addToCart(
							user.userId,
							this.product,
							this.qty,
							res.session.sessionId
						).subscribe(cartRes =>{
							if(cartRes && cartRes.cartItem){
								this.newCartService.getCartItems(res.session.sessionId).subscribe();
							}
						})
					}
				})
			})
			
		}else{
			this.modalService.showLoginModal();
		}

		
	}
	qty(userId: any, product: Product, qty: any, sessionId: any) {
		throw new Error('Method not implemented.');
	}



	addToCompare(event: Event) {
		event.preventDefault();
		if (this.isInCompare()) return;
		this.compareService.addToCompare(this.product);
	}

	quickView(event: Event) {
		event.preventDefault();
		this.productService.getProductById(this.product.productId).subscribe(res =>{
			this.modalService.showQuickViewTwo(res.product);
		})
		
	}

	isInCompare() {
		return this.compareService.isInCompare(this.product);
	}

	

	testAddProd(event){
		this.productService.addProduct(event.target.files[0]).subscribe(res =>{
			
		})
	}
	//TEST ONLY
	selectedFiles:[]
	selectFiles(event:any){
		this.selectedFiles = event.target.files;
		this.productService.addProductImages(this.selectedFiles ).subscribe(res =>{
			//console.log(res)
		})
	}
}