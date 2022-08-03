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
						this.orderService.getUserSessionOrders(user.userId,sessionId).subscribe((res:any) =>{
							if(res && res.order && res.order.orderId){
								this.orderService.getOrderinvoice(res.order.orderId).subscribe(order=>{
									console.log(order)
								})
							}
						})
					}
				})
				
			}
		})
	}
}
