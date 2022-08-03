import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ModalService } from 'src/app/shared/services/modal.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { forkJoin } from 'rxjs';

@Component({
	selector: 'app-ecommerce-product-modal',
	templateUrl: './product-modal.component.html',
	styleUrls: ['./product-modal.component.scss']
})

export class ProductModalComponent implements OnInit {


	
	constructor(
				private authService : AuthService,
				private toast: ToastrService,
				private modalService:ModalService,
				private orderService:OrderService) { }

	ngOnInit(): void {
		
		
	}

	closeModal(){
		let modal = document.querySelector('.product-modal') as HTMLElement;
		if (modal){
			this.modalService.closeProductModal(modal);
		}
	}




	
}
