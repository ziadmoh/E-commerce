import { Component, OnInit, ViewEncapsulation, ElementRef, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import imagesLoaded from 'imagesloaded';

import { Product } from 'src/app/shared/classes/product';
import { environment } from 'src/environments/environment';

import { ApiService } from 'src/app/shared/services/api.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { CompareService } from 'src/app/shared/services/compare.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { sliderOpt } from 'src/app/shared/data';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { NewCartService } from 'src/app/shared/services/new-cart.service';

declare var $: any;

@Component({
	selector: 'app-ecommerce-quick-view-two',
	templateUrl: './quick-view-two.component.html',
	styleUrls: ['./quick-view-two.component.scss'],
	encapsulation: ViewEncapsulation.None
})

export class QuickViewTwoComponent implements OnInit {

	@Input() product: Product;
	loaded = false;
	options = {
		...sliderOpt,
		dots: false,
		nav: false,
		loop: false,
		onTranslate: (e: any) => this.itemChange(e, this)
	}
	variationGroup = [];
	selectableGroup = [];
	sizeArray = [];
	colorArray = [];
	selectedVariant = {
		color: null,
		colorName: null,
		price: null,
		size: "",
		disabled: false
	};
	maxPrice = 0;
	minPrice = 99999;
	paddingTop = '100%';
	currentIndex = 0;
	qty = 1;

	firstImgWidth = 0;

	firstImgHeight = 0;

	SERVER_URL = environment.SERVER_URL;

	@ViewChild('singleSlider') singleSlider: any;

	constructor(
		public apiService: ApiService,
		public cartService: CartService,
		public compareService: CompareService,
		public utilsService: UtilsService,
		public router: Router,
		public el: ElementRef,
		private authService:AuthService,
		private modalService:ModalService,
		private newCartService:NewCartService) {
	}

	public trackByFn(index, item) {
		if (!item) return null;
		return item.id;
	}

	getImageSizes(url){
		let img = new Image();
		img.onload = function() {
			this.paddingTop = Math.floor((parseFloat(img.height.toString()) / parseFloat(img.width.toString()) * 1000)) / 10 + '%';

		}.bind(this);
		img.src = url;
	}

	ngOnInit(): void {
		
		this.getImageSizes(this.product.productImage)
		//this.refreshSelectableGroup();
		let self = this;
		imagesLoaded(".quickView-modal").on("done", function () {
			this.loaded = true;
		}.bind(this))
		// this.loaded = true
		// this.apiService.getSingleProduct(this.slug, true).subscribe(result => {
		// 	this.product = result.product;

		// 	let min = this.minPrice;
		// 	let max = this.maxPrice;

		// 	this.variationGroup = this.product.variants.reduce((acc, cur) => {
		// 		cur.size.map(item => {
		// 			acc.push({
		// 				color: cur.color,
		// 				colorName: cur.color_name,
		// 				size: item.name,
		// 				price: cur.price
		// 			});
		// 		});
		// 		if (min > cur.price) min = cur.price;
		// 		if (max < cur.price) max = cur.price;
		// 		return acc;
		// 	}, []);

		// 	if (this.product.variants.length == 0) {
		// 		min = this.product.sale_price
		// 			? this.product.sale_price
		// 			: this.product.price;
		// 		max = this.product.price;
		// 	}

		// 	this.minPrice = min;
		// 	this.maxPrice = max;

		// 	this.paddingTop = Math.floor((parseFloat(this.product.pictures[0].height.toString()) / parseFloat(this.product.pictures[0].width.toString()) * 1000)) / 10 + '%';

		// 	this.refreshSelectableGroup();

		// 	let self = this;
		// 	imagesLoaded(".quickView-modal").on("done", function () {
		// 		self.loaded = true;
		// 	})
		// })
	}

	itemChange(e: any, self: any) {
		document.querySelector('#product-image-gallery').querySelector('.product-gallery-item.active').classList.remove('active');
		document.querySelector('#product-image-gallery').querySelectorAll('.product-gallery-item')[e.item.index].classList.add('active');

		self.currentIndex = e.item.index;
	}

	addCart(event: Event) {
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
			if (this.selectedVariant.color && this.selectedVariant.size !== "") {
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

	closeQuickView() {
		let modal = document.querySelector('.quickView-modal') as HTMLElement;
		if (modal)
			modal.click();
	}

	changeImage($event: Event, i = 0) {
		this.currentIndex = i;
		this.singleSlider.to(i);
		$event.preventDefault();
	}
}