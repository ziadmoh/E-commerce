import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

import { CartService } from 'src/app/shared/services/cart.service';
import { NewCartService } from 'src/app/shared/services/new-cart.service';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-ecommerce-cart-menu',
	templateUrl: './cart-menu.component.html',
	styleUrls: ['./cart-menu.component.scss']
})

export class CartMenuComponent implements OnInit {

	SERVER_URL = environment.SERVER_URL;
	cartItems = [];
	numberOfcartItems = 0;
	subTotal = 0;
	constructor(public cartService: CartService,
		public newCartService:NewCartService,
		private authService:AuthService
		) {
	}

	ngOnInit(): void {
		//this.getCartItems()
		this.newCartService.cartItems.subscribe(items =>{
			this.newCartService.cartItemsList = items
			this.cartItems = this.newCartService.cartItemsList
		})
		this.newCartService.numberOfcartItems.subscribe(num =>{
			this.numberOfcartItems = num
		})
		this.newCartService.cartSubTotal.subscribe(sub =>{
			this.subTotal = sub
		})
	}

	getCartItems(){
		this.newCartService.getCartItems().subscribe((items:any) => {
			// if(items && items.sessionCartItems){
			// 	this.newCartService.cartItems.next(items.sessionCartItems);
			// 	this.newCartService.numberOfcartItems.next(items.sessionCartItems);
			// 	this.numberOfcartItems =this.newCartService.numberOfcartItems
			// }else{
			// 	this.cartItems = []
			// }
		});
	}

	removeFromCart(event: Event,product,session_id){
		event.preventDefault();
		this.authService.newUser.subscribe(user =>{
			this.newCartService.removeFromCart(
				user.userId,
				product,
				session_id
			).subscribe((res:any) =>{
				if(res && res.message == 'cart item is deleted successfully'){
					this.getCartItems();
				}
			})
		})
	}

}