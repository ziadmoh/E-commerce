import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/classes/product';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
	selector: 'product-info-one',
	templateUrl: './info-one.component.html',
	styleUrls: ['./info-one.component.scss']
})

export class InfoOneComponent implements OnInit {

	@Input() product: Product;

	score:any = 1

	constructor(private modalService:ModalService,
		private authService:AuthService,
		private productService:ProductService,
		private toast:ToastrService) { }

	ngOnInit(): void {
	}

	setRating = (event: any) => {
		event.preventDefault();

		if (event.currentTarget.parentNode.querySelector('.active')) {
			event.currentTarget.parentNode.querySelector('.active').classList.remove('active');
		}

		event.currentTarget.classList.add('active');
	}

	rateProduct(num){
			this.authService.newUser.subscribe(user =>{
				if(user && user.userId){
					this.productService.rateProduct(user.userId,
						this.product.productId,num).subscribe((res:any)=>{
							if(res && res.message){
								this.toast.info(res.message)
							}
						})
				}else{
					console.log('Hello')
					this.modalService.showLoginModal();
				}
			})
	}
}