import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { ProductService } from 'src/app/shared/services/product.service';


@Component({
	selector: 'admin-order-details',
	templateUrl: './order-details.component.html',
	styleUrls: ['./order-details.component.scss']
})

export class AdminOrderDetailsComponent implements OnInit {

	order:any = {}

	loaded:boolean = false

	constructor(private authService:AuthService,
		private orderService:OrderService,
		public productService:ProductService,
		private activeRoute:ActivatedRoute) { }

	ngOnInit(): void { 
		
		this.getOrderData()
	}

	getOrderData(){

		this.activeRoute.params.subscribe(params => {
			this.orderService.getOrderinvoice(params['orderId']).subscribe((res:any) =>{
				if (res && res.order) {
					this.order = res.order;
					this.loaded = true
				}else{
					this.order = {}
				}
				this.loaded = true
			})
		});

	}


	


}
