import { Component, OnInit, Input, HostListener, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from 'src/app/shared/classes/product';

import { CartService } from 'src/app/shared/services/cart.service';
import { CompareService } from 'src/app/shared/services/compare.service';
import { environment } from 'src/environments/environment';
import { NewCartService } from 'src/app/shared/services/new-cart.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';

declare var $: any;

@Component({
	selector: 'product-detail-one',
	templateUrl: './detail-one.component.html',
	styleUrls: ['./detail-one.component.scss']
})

export class DetailOneComponent implements OnInit {

	@Input() product: Product;

	productLink:string ='';

	variationGroup = [];
	selectableGroup = [];
	sizeArray = [];
	colorArray = [];
	selectedVariant = {
		color: null,
		colorName: null,
		price: null,
		size: ""
	};
	maxPrice = 0;
	minPrice = 99999;
	qty = 1;
	qty2 = 1;

	SERVER_URL = environment.SERVER_URL;

	constructor(
		public cartService: CartService,
		public compareService: CompareService,
		public router: Router,
		public el: ElementRef,
		public newCartService:NewCartService,
		public modalService:ModalService,
		public authService:AuthService,
		private toast:ToastrService) {
	}

	ngOnInit(): void {
		this.productLink = window.location.href;
		// let min = this.minPrice;
		// let max = this.maxPrice;
		// this.variationGroup = this.product.variants.reduce((acc, cur) => {
		// 	cur.size.map(item => {
		// 		acc.push({
		// 			color: cur.color,
		// 			colorName: cur.color_name,
		// 			size: item.name,
		// 			price: cur.price
		// 		});
		// 	});
		// 	if (min > cur.price) min = cur.price;
		// 	if (max < cur.price) max = cur.price;
		// 	return acc;
		// }, []);

		// if (this.product.variants.length == 0) {
		// 	min = this.product.sale_price
		// 		? this.product.sale_price
		// 		: this.product.price;
		// 	max = this.product.price;
		// }

		// this.minPrice = min;
		// this.maxPrice = max;

		// this.refreshSelectableGroup();
	}

	@HostListener('window:scroll', ['$event'])
	handleScroll(event: Event) {
		if (document.querySelector('.default-page')) {
			this.scrollHandler()
		}
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
					}else if (res && res.message){
						this.toast.error(res.message)
					}
				})
			})
			
		}else{
			this.modalService.showLoginModal();
		}
	}

	

	addToCompare(event: Event) {
		event.preventDefault();
		if (this.isInCompare()) return;
		this.compareService.addToCompare(this.product);
	}

	isInCompare() {
		return this.compareService.isInCompare(this.product);
	}

	

	refreshSelectableGroup() {
		let tempArray = [...this.variationGroup];
		if (this.selectedVariant.color) {
			tempArray = this.variationGroup.reduce((acc, cur) => {
				if (this.selectedVariant.color !== cur.color) {
					return acc;
				}
				return [...acc, cur];
			}, []);
		}

		this.sizeArray = tempArray.reduce((acc, cur) => {
			if (acc.findIndex(item => item.size == cur.size) !== -1)
				return acc;
			return [...acc, cur];
		}, []);

		tempArray = [...this.variationGroup];
		if (this.selectedVariant.size) {
			tempArray = this.variationGroup.reduce((acc, cur) => {
				if (this.selectedVariant.size !== cur.size) {
					return acc;
				}
				return [...acc, cur];
			}, []);
		}

		this.colorArray = this.product.variants.reduce((acc, cur) => {
			if (
				tempArray.findIndex(item => item.color == cur.color) == -1
			) {
				return [
					...acc,
					{
						color: cur.color,
						colorName: cur.color_name,
						price: cur.price,
						disabled: true
					}
				];
			}
			return [
				...acc,
				{
					color: cur.color,
					colorName: cur.color_name,
					price: cur.price,
					disabled: false
				}
			];
		}, []);

		let toggle = this.el.nativeElement.querySelector('.variation-price');
		if (toggle) {
			if (this.selectedVariant.color && this.selectedVariant.size != "") {
				$(toggle).slideDown();
			} else {
				$(toggle).slideUp();
			}
		}
	}

	selectColor(event: Event, item: any) {
		event.preventDefault();

		if (item.color == this.selectedVariant.color) {
			this.selectedVariant = {
				...this.selectedVariant,
				color: null,
				colorName: null,
				price: item.price
			};
		} else {
			this.selectedVariant = {
				...this.selectedVariant,
				color: item.color,
				colorName: item.colorName,
				price: item.price
			};
		}
		this.refreshSelectableGroup();
	}

	selectSize(event: Event) {
		if (this.selectedVariant.size == 'null') {
			this.selectedVariant = { ...this.selectedVariant, size: "" };
		}
		if ($(event.target).val() == "") {
			this.selectedVariant = { ...this.selectedVariant, size: "" };
		} else {
			this.selectedVariant = { ...this.selectedVariant, size: $(event.target).val() };
		}
		this.refreshSelectableGroup();
	}

	onChangeQty(current: number) {
		this.qty = current;
		this.qty2 = current;
	}

	onChangeQty2(current: number) {
		this.qty2 = current;
		this.qty = current;
	}

	clearSelection() {
		this.selectedVariant = {
			...this.selectedVariant,
			color: null,
			colorName: null,
			size: ""
		};
		this.refreshSelectableGroup();
	}

	scrollHandler() {
		let stickyBar = this.el.nativeElement.querySelector('.sticky-bar');
		if (stickyBar.classList.contains('d-none') && this.el.nativeElement.getBoundingClientRect().bottom < 0) {
			stickyBar.classList.remove('d-none');
			return;
		}
		if (!stickyBar.classList.contains('d-none') && this.el.nativeElement.getBoundingClientRect().bottom > 0) {
			stickyBar.classList.add('d-none');
		}
	}

	getProductCategory(){
		if(this.product.box == '1'){
			return {category: 'boxes'}
		}else{
			return {category: 'other_products'}
		}
	}
}