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


	childrenInfo :any[] =[]

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
					this.getChlidDate(this.order.session_id)
					this.loaded = true
				}else{
					this.order = {}
				}
				this.loaded = true
			})
		});
	}


	getChlidDate(sessionId){
		this.orderService.getAllOrderChildrenInfo(sessionId).subscribe((res:any) =>{
			if(res && res.sessionOrderItemsInfo){
				this.childrenInfo = res.sessionOrderItemsInfo
			}
		})
	}

	downloadImg(child){
		const link = document.createElement('a');
		link.setAttribute('target', '_blank');
		link.setAttribute('href', child.childPhoto);
		link.setAttribute('download', child.childName);
		document.body.appendChild(link);
		link.click();
		link.remove();
	}


	


}
