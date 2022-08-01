import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';

import { CartService } from 'src/app/shared/services/cart.service';
import { NewCartService } from 'src/app/shared/services/new-cart.service';
import { OrderService } from 'src/app/shared/services/order.service';

declare var $: any;

@Component({
	selector: 'shop-checkout-page',
	templateUrl: './checkout.component.html',
	styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent implements OnInit, OnDestroy {

	cartItems = [];

	subTotal = 0;
	shippingCost = 0

	checkOutForm:FormGroup;

	promoCode = '';

	user:User

	private subscr: Subscription;


	constructor(public cartService: CartService,
				public newCartService:NewCartService,
				private authService:AuthService,
				private orderService:OrderService,
				private toast: ToastrService,
		) {
	}

	ngOnInit(): void {
		this.newCartService.cartItems.subscribe(items =>{
			this.cartItems = items
		})
		this.newCartService.cartSubTotal.subscribe(sub =>{
			this.subTotal = sub
		})

		
		

		this.shippingCost = this.newCartService.shippingCost

		document.querySelector('body').addEventListener("click", () => this.clearOpacity())

		this.checkOutForm = new FormGroup({
			fullName:new FormControl({value: null, disabled: true},Validators.required),
			contactPhone:new FormControl(null,[Validators.required,Validators.pattern(/^(01)[0512][0-9]{8}$/)]),
			additionalContactPhone:new FormControl(null,[Validators.required,Validators.pattern(/^(01)[0512][0-9]{8}$/)]),
			deliveryLocation1:new FormControl(null,Validators.required),
			deliveryLocation2:new FormControl(null),
		})
		this.authService.newUser.subscribe(user =>{
			this.user = user;
			if(user.fullName){
				this.checkOutForm.get('fullName').patchValue(user.fullName)
			}
		})
	}

	changeShipping(value: number) {
		this.shippingCost = value;
		this.newCartService.shippingCost = this.shippingCost
	}

	ngOnDestroy(): void {
		document.querySelector('body').removeEventListener("click", () => this.clearOpacity())
	}

	clearOpacity() {
		let input: any = document.querySelector('#checkout-discount-input');
		if (input && input.value == "") {
			let label: any = document.querySelector('#checkout-discount-form label');
			label.removeAttribute('style');
		}
	}

	addOpacity(event: any) {
		event.target.parentElement.querySelector("label").setAttribute("style", "opacity: 0");
		event.stopPropagation();

	}

	formToggle(event: any) {
		const parent: HTMLElement = event.target.closest('.custom-control');
		const submenu: HTMLElement = parent.closest('.form-group').querySelector('.shipping-info');

		if (parent.classList.contains('open')) {
			$(submenu).slideUp(300, function () {
				parent.classList.remove('open');
			});
		}
		else {
			$(submenu).slideDown(300, function () {
				parent.classList.add('open');
			});
		}

		event.preventDefault();
		event.stopPropagation();
	}

	checkOutOrder(){
		if(this.checkOutForm.valid){
				if(this.user && this.user.userId){
					this.orderService.checkOutTheOrder(
						this.user.userId,
						this.newCartService.userSessionId,
						this.checkOutForm.get('contactPhone').value,
						this.checkOutForm.get('additionalContactPhone').value,
						this.promoCode,
						this.checkOutForm.get('deliveryLocation1').value + ' ' +this.checkOutForm.get('deliveryLocation2').value ,
						).subscribe((res:any) =>{
							if(res && res.message && res.message2){
								this.toast.info(res.message);
								this.toast.success(res.message2);
							}
						})
				}

		}else{
			this.toast.error('Please complete the missing data!');
		}
		
		
	}
}
