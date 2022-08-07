import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { ProductService } from 'src/app/shared/services/product.service';


@Component({
	selector: 'admin-orders',
	templateUrl: './orders.component.html',
	styleUrls: ['./orders.component.scss']
})

export class AdminOrdersComponent implements OnInit {

	orders :any[] = []

	selectedFilter:{name:string,value:string,disabled:boolean} = {name:'All orders',value:'all',disabled:false}
	
	prevSelectedFilter:{name:string,value:string,disabled:boolean} = {name:'All orders',value:'all',disabled:false}
	
	filerOptions:any[] =[
		{name:'All orders',value:'all',disabled:false},
		{name:'Last orders',value:'last',disabled:false},
		{name:'Today orders',value:'today',disabled:false},
		{name:'Waiting orders',value:'waiting',disabled:false},
		{name:'Confirmed orders',value:'confirmed',disabled:false},
		{name:'In printing orders',value:'inPrint',disabled:false},
		{name:'Out for delivery orders',value:'outForDelivery',disabled:false},
	]

	constructor(private authService:AuthService,
		private orderService:OrderService,
		public productService:ProductService,
		private toast:ToastrService) { }

	ngOnInit(): void { 
		this.getAllOrders()
	}


	getAllOrders(){
		this.authService.newUser.subscribe(user =>{
			if(user && user.userId && user.type == 'admin'){
				this.orderService.getAllOrders().subscribe((res:any) =>{
					if(res && res.orders){
						this.orders = res.orders;
					}else {
						this.orders = []
					}
				})
			}
		})
	}
	
	getLastOrders(){
		this.authService.newUser.subscribe(user =>{
			if(user && user.userId && user.type == 'admin'){
				this.orderService.getLastOrders().subscribe((res:any) =>{
					if(res && res.orders){
						this.orders = res.orders;
					}else{
						this.orders = []
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
						this.orders = res.todayOrders;
					}else{
						this.orders = []
					}
				})
			}
		})
	}

	getWaitingOrders(){
		this.authService.newUser.subscribe(user =>{
			if(user && user.userId && user.type == 'admin'){
				this.orderService.getWaitingOrders().subscribe((res:any) =>{
					if(res && res.waitingOrders){
						this.orders = res.waitingOrders;
					}else{
						this.orders = []
					}
				})
			}
		})
	}

	getConfirmedorders(){
		this.authService.newUser.subscribe(user =>{
			if(user && user.userId && user.type == 'admin'){
				this.orderService.getConfirmedorders().subscribe((res:any) =>{
					if(res && res.confirmedOrders){
						this.orders = res.confirmedOrders;
					}else{
						this.orders = []
					}
				})
			}
		})
	}

	getInprintingOrders(){
		this.authService.newUser.subscribe(user =>{
			if(user && user.userId && user.type == 'admin'){
				this.orderService.getInprintingOrders().subscribe((res:any) =>{
					if(res && res.inPrintingOrders){
						this.orders = res.inPrintingOrders;
					}else{
						this.orders = []
					}
				})
			}
		})
	}

	getOutForDeliveryOrders(){
		this.authService.newUser.subscribe(user =>{
			if(user && user.userId && user.type == 'admin'){
				this.orderService.getOutForDeliveryOrders().subscribe((res:any) =>{
					if(res && res.outForDeliveryOrders){
						this.orders = res.outForDeliveryOrders;
					}else{
						this.orders = []
					}
				})
			}
		})
	}


	ChangeFiler(event){

		if(this.prevSelectedFilter.value !== this.selectedFilter.value){
			this.checkSelectedFilter()
		}
		this.prevSelectedFilter = {...this.selectedFilter}
	}

	checkSelectedFilter(){
		if(this.selectedFilter.value == 'all'){
			this.getAllOrders()
			
		}else if (this.selectedFilter.value == 'last'){
			this.getLastOrders()
		}else if (this.selectedFilter.value == 'today'){
			this.getTodayOrders()
		}else if (this.selectedFilter.value == 'waiting'){
			this.getWaitingOrders()
		}else if (this.selectedFilter.value == 'confirmed'){
			this.getConfirmedorders()
		}else if (this.selectedFilter.value == 'inPrint'){
			this.getInprintingOrders()
		}else if (this.selectedFilter.value == 'outForDelivery'){
			this.getOutForDeliveryOrders()
		}
	}

	changeOrderstatus(order){
		if(order && order.orderStatus == 'waiting'){
			this.orderService.changeOrderStatus('confirmorder',order.orderId).subscribe((res:any) =>{
				if(res && res.order ){
					
					this.checkSelectedFilter()
				}
			})
		} else if(order && order.orderStatus == 'confirmed'){
			this.orderService.changeOrderStatus('printingorder',order.orderId).subscribe((res:any) =>{
				if(res && res.order){
					this.checkSelectedFilter()
				}
			})
		} else if(order && order.orderStatus == 'inPrinting'){
			this.orderService.changeOrderStatus('outfordeliveryorder',order.orderId).subscribe((res:any) =>{
				if(res && res.order){
					this.checkSelectedFilter()
				}
			})
		} else if(order && order.orderStatus == 'outForDelivery'){
			this.orderService.changeOrderStatus('orderdelivered',order.orderId).subscribe((res:any) =>{
				if(res && res.order){
					this.checkSelectedFilter()
				}
			})
		} else{
			
		}
	}



}
