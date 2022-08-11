import { Component, OnInit, OnDestroy } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
	shippingCost :any = '';

	checkOutForm:UntypedFormGroup;

	promoCode = '';

	user:User;

	deliveryFees:any[] = []

	private subscr: Subscription;


	constructor(public cartService: CartService,
				public newCartService:NewCartService,
				private authService:AuthService,
				private orderService:OrderService,
				private toast: ToastrService,
				private router:Router
		) {
	}

	ngOnInit(): void {
		this.newCartService.cartItems.subscribe(items =>{
			this.cartItems = items
		})
		this.newCartService.cartSubTotal.subscribe(sub =>{
			this.subTotal = sub
		})


		this.newCartService.shippingFees.subscribe(dileveryFees =>{
			this.deliveryFees = dileveryFees
		})
		
		

		this.shippingCost = this.newCartService.shippingCost

		document.querySelector('body').addEventListener("click", () => this.clearOpacity())

		this.checkOutForm = new UntypedFormGroup({
			fullName:new UntypedFormControl({value: null, disabled: false},Validators.required),
			contactPhone:new UntypedFormControl(null,[Validators.required,Validators.pattern(/^(01)[0512][0-9]{8}$/)]),
			additionalContactPhone:new UntypedFormControl(null,[Validators.required,Validators.pattern(/^(01)[0512][0-9]{8}$/)]),
			deliveryLocation1:new UntypedFormControl(null,Validators.required),
		})
		this.authService.newUser.subscribe(user =>{
			this.user = user;
			if(user.fullName){
				this.checkOutForm.get('fullName').patchValue(user.fullName)
			}
			if(user.phone){
				this.checkOutForm.get('contactPhone').patchValue(user.phone)
			}
			if(user.address){
				this.checkOutForm.get('deliveryLocation1').patchValue(user.address)
			}
			
		})
	}

	changeShipping(fee) {
		this.shippingCost = fee;
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
					this.newCartService.userSessionId.subscribe(sessionId=>{
						this.orderService.checkOutTheOrder(
							this.user.userId,
							sessionId,
							this.checkOutForm.get('contactPhone').value,
							this.checkOutForm.get('additionalContactPhone').value,
							this.promoCode,
							this.checkOutForm.get('deliveryLocation1').value ,
							this.shippingCost.feeId
							).subscribe((res:any) =>{
								if(res && res.order && res.message2){
									this.toast.info(res.message);
									this.toast.success(res.message2);
									this.newCartService.cartItems.next([])
									this.newCartService.numberOfcartItems.next(0);
									window.location.href = location.protocol + '//' + window.location.host + '/shop/orders'
									// this.router.navigate(['/shop/orders'])
								}else if (res && res.message && res.order){
									this.toast.success(res.message);
									this.newCartService.cartItems.next([])
									this.newCartService.numberOfcartItems.next(0)
									window.location.href = location.protocol + '//' + window.location.host + '/shop/orders'
									// this.router.navigate(['/shop/orders'])
								}else{
									this.toast.error(res.message);
								}
							})
					})
					
				}

		}else{
			this.toast.error('Please complete the missing data!');
		}
		
		
	}

}
