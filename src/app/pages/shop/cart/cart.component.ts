import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { CartService } from 'src/app/shared/services/cart.service';

import { environment } from 'src/environments/environment';
import { NewCartService } from 'src/app/shared/services/new-cart.service';
import { CartItem } from 'src/app/shared/classes/cart-item';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'shop-cart-page',
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.scss']
})

export class CartComponent implements OnInit, OnDestroy {

	cartItems = [];
	SERVER_URL = environment.SERVER_URL;
	shippingCost = 40;

	subTotal = 0

	canCheckOut:boolean = false;

	private subscr: Subscription;

	constructor(private store: Store<any>, public cartService: CartService,
		public newCartService: NewCartService,
		private authService:AuthService,
		private modalService:ModalService,
		private orderService:OrderService,
		private router:Router,
		private toast: ToastrService,) {
	}

	ngOnInit() {
		//this.getCartItems()
		//this.cartItems = this.newCartService.cartItems;
		this.newCartService.cartItems.subscribe(items =>{
			this.cartItems = items;
			this.getAllOrderChildrenInfo(items)
		})
		this.newCartService.cartSubTotal.subscribe(sub =>{
			this.subTotal = sub
		})

		this.orderService.canCheckOut.subscribe(res =>{
			this.canCheckOut = res
		})
	}

	getCartItems(session_id){
		this.subscr = this.newCartService.getCartItems(session_id).subscribe((items:any) => {
			// if(items && items.sessionCartItems){
			// 	this.cartItems = this.newCartService.cartItems;
			// }else{
			// 	this.cartItems = []
			// }
		});
	}

	ngOnDestroy() {
	//	this.subscr.unsubscribe();
	}

	trackByFn(index: number, item: any) {
		if (!item) return null;
		return item.slug;
	}

	updateCart(event: any) {
		event.preventDefault();
		event.target.parentElement.querySelector('.icon-refresh').classList.add('load-more-rotating');

		setTimeout(() => {
			this.cartService.updateCart(this.cartItems);
			event.target.parentElement.querySelector('.icon-refresh').classList.remove('load-more-rotating');
			document.querySelector('.btn-cart-update:not(.diabled)') && document.querySelector('.btn-cart-update').classList.add('disabled');
		}, 400);
	}

	changeShipping(value: number) {
		this.shippingCost = value;
		this.newCartService.shippingCost = this.shippingCost
	}

	onChangeQty(event: number, product: any,session_id) {
		document.querySelector('.btn-cart-update.disabled') && document.querySelector('.btn-cart-update.disabled').classList.remove('disabled');
		
		this.authService.newUser.subscribe(user =>{
			
			this.newCartService.editCartItemQuantity(
				user.userId,
				product,
				event,
				session_id
			).subscribe((res:any) =>{
				if(res && res.message == "quantity updated succesfully"){
					this.getCartItems(session_id);
					this.cartItems = this.cartItems.reduce((acc, cur) => {
						if (cur.productName === product.productName) {
							acc.push({
								...cur,
								qty: event,
								sum: (cur.productPrice) * event
							});
						}
						else acc.push(cur);
			
						return acc;
					}, [])
					
				}
			})
		})
		
	}

	removeFromCart(product,session_id ){
		this.authService.newUser.subscribe(user =>{
			this.newCartService.removeFromCart(
				user.userId,
				product,
				session_id
			).subscribe((res:any) =>{
				if(res && res.message == 'cart item is deleted successfully'){
					this.getCartItems(session_id);
				}
			})
		})
	}

	customizeOrderData(item){
		this.orderService.orderChildData = {
			quantity:item.quantity,
			product:item.product,
			isBox:item.product.box == '1' ? true : false,
			cartItemId:item.cartItemId,
			session_id:item.session_id
		}
		this.modalService.showChildDataModal()
	}

	getAllOrderChildrenInfo(cartItems){
		this.newCartService.userSessionId.subscribe(sesseionId =>{
			this.orderService.getAllOrderChildrenInfo(sesseionId).subscribe((res:any) =>{
				if(res && res.sessionOrderItemsInfo){
					let placeHolder = [];
					let totalCartQuantity = 0
					cartItems.forEach(item =>{
						totalCartQuantity = totalCartQuantity + item.quantity
						let orderitem = res.sessionOrderItemsInfo.filter(itemInfo =>{
							return itemInfo.cartItem_id == item.cartItemId
						})
						if(orderitem && orderitem.length == item.quantity){
							placeHolder.push(true)
						}
					})
					if(placeHolder.length ==cartItems.length ){
						this.orderService.canCheckOut.next(true)
					}else{
						this.orderService.canCheckOut.next(false)
					}
				}
			})
		})
		
	}

	checkOutNavigate(){
		if(this.canCheckOut){
			this.router.navigate(['/shop/checkout'])
		}else{
			this.toast.error('Please customize your products first!');
		}
	}
}