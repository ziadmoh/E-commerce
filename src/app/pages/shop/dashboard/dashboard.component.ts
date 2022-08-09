import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NewCartService } from 'src/app/shared/services/new-cart.service';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
	selector: 'shop-dashboard-page',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
})

export class DashboardComponent implements OnInit {

	constructor(private el: ElementRef, 
		private renderer: Renderer2,
		private authService:AuthService,
		private orderService:OrderService,
		private newCartService:NewCartService,
		) {
	}

	userOrders = [];
	isLoaded= false;

	statusList = [
		{status:'Waiting',value:'waiting',index:0},
		{status:'Confirmed',value:'confirmed',index:1},
		{status:'In printing',value:'inPrinting',index:2},
		{status:'Out for delivery',value:'outForDelivery',index:3},
		{status:'Deliverd',value:'deliverd',index:4}
	]

	ngOnInit(): void {
		this.getUserOrders()
	}

	viewTab($event: Event, prevId: number, nextId: number) {
		$event.preventDefault();
		let nodes = this.el.nativeElement.querySelectorAll(".nav-dashboard .nav-link");
		this.renderer.removeClass(nodes[prevId], 'active');
		this.renderer.addClass(nodes[nextId], 'active');
	}

	getUserOrders(){
		this.authService.newUser.subscribe(user =>{
			if(user && user.userId){
				this.newCartService.userSessionId.subscribe(sessionId=>{
					if(sessionId){
						this.orderService.getUserOrders(user.userId).subscribe((res:any) =>{
							if(res && res.orders.length){
								this.userOrders = this.sortData(res.orders)
								this.getStatusColor(this.userOrders)
								console.log(this.userOrders)
							}
							this.isLoaded = true
						})
					}
				})
				
			}
		})
	}
	logOut(){
		this.authService.logout();
	}

	getStatusColor(orders:any[]){
		orders.map((order) =>{
			if(order.orderStatus == 'waiting'){
				return order['activeColors'] = 1 
			}else if(order.orderStatus == 'confirmed'){
				return order['activeColors'] = 2 
			}else if(order.orderStatus == 'inPrinting'){
				return order['activeColors'] = 3 
			}else if(order.orderStatus == 'outForDelivery'){
				return order['activeColors'] = 4 
			}else {
				return order['activeColors'] = 5 
			}
		})
	}

	sortData(orders) {
		return orders.sort((a, b) => {
		  return <any>new Date(b.creationDate) - <any>new Date(a.creationDate);
		});
	  }
}
