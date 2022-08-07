import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { ProductService } from 'src/app/shared/services/product.service';


@Component({
	selector: 'admin-home',
	templateUrl: './admin-home.component.html',
	styleUrls: ['./admin-home.component.scss']
})

export class AdminHomeComponent implements OnInit {
	
	lastOrders:any[] = []

	todayOrders:any[] = []

	allOrders:any[] = []

	todaySales = 0

	overallSales = 0

	constructor(private authService:AuthService,
		private orderService:OrderService,
		public productService:ProductService,
		private toast:ToastrService) { }
	ngOnInit(){
		this.getLastOrders()
		this.getTodayOrders()
		this.getAllOrders()
	}

	getLastOrders(){
		this.authService.newUser.subscribe(user =>{
			if(user && user.userId && user.type == 'admin'){
				this.orderService.getLastOrders().subscribe((res:any) =>{
					if(res && res.orders){
						this.lastOrders = res.orders;
					}
				})
			}
		})
	}

	getTodayOrders(){
		this.authService.newUser.subscribe(user =>{
			if(user && user.userId && user.type == 'admin'){
				this.orderService.getTodayOrders().subscribe((res:any) =>{
					if(res && res.todayOrders){
						this.todayOrders = res.todayOrders;
						this.todaySales =this.getTotalSales(res.todayOrders)
					}
				})
			}
		})
	}

	getAllOrders(){
		this.authService.newUser.subscribe(user =>{
			if(user && user.userId && user.type == 'admin'){
				this.orderService.getAllOrders().subscribe((res:any) =>{
					if(res && res.orders){
						this.allOrders = res.orders;
						this.overallSales =this.getTotalSales(res.orders)
					}
				})
			}
		})
	}

	getTotalSales(orders){
		let total = 0
		orders.forEach(order =>{
			total = total + order.totalPrice
		})
		return total
	}
	
	getNewStatus(current){
		switch (current) {
			case 'waiting':
				return 'confirmed'
			case 'confirmed':
				return 'In printing'
			case 'inPrinting':
				return 'Out for delivery'
			case 'outForDelivery':
				return 'Delivered'
		
			default:
				return 'Done'
		}
		
	}

	changeOrderstatus(order){
		if(order && order.orderStatus == 'waiting'){
			this.orderService.changeOrderStatus('confirmorder',order.orderId).subscribe((res:any) =>{
				if(res && res.order){
					this.getLastOrders()
				}
			})
		} else if(order && order.orderStatus == 'confirmed'){
			this.orderService.changeOrderStatus('printingorder',order.orderId).subscribe((res:any) =>{
				if(res && res.order){
					this.getLastOrders()
				}
			})
		} else if(order && order.orderStatus == 'inPrinting'){
			this.orderService.changeOrderStatus('outfordeliveryorder',order.orderId).subscribe((res:any) =>{
				if(res && res.order){
					this.getLastOrders()
				}
			})
		} else if(order && order.orderStatus == 'outForDelivery'){
			this.orderService.changeOrderStatus('orderdelivered',order.orderId).subscribe((res:any) =>{
				if(res && res.order){
					this.getLastOrders()
				}
			})
		} else{
			
		}
	}

}
