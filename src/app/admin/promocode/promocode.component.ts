import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/classes/product';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { ProductService } from 'src/app/shared/services/product.service';


@Component({
	selector: 'admin-promocode',
	templateUrl: './promocode.component.html',
	styleUrls: ['./promocode.component.scss']
})

export class AdminPromocodeComponent implements OnInit {

	promocodes:any[] = []

	isModalVisible:boolean = false;
	
	isEditModalVisible:boolean = false;

	selectedPrmocode:any = '';

	newPromocodeForm:UntypedFormGroup;

	updatePromocodeForm:UntypedFormGroup;

	todayDate = new Date();

	rangeDates = '';

	constructor(private productsService:ProductService,
		private modalService:ModalService,
		private toast:ToastrService,
		private authService:AuthService) { }

	ngOnInit(): void {
		
		this.initForm()
		this.getAllPromocodes()
		
		
	}


	initForm(){
		this.newPromocodeForm = new UntypedFormGroup({
			promoCode: new UntypedFormControl(null,Validators.required),
			discountRatio: new UntypedFormControl(null,[Validators.required,Validators.pattern(/^\d*\.?\d*$/)]),
			dateRange: new UntypedFormControl(null,[Validators.required]),
		})
	}

	statusReturn(due){
		let today = new Date()
		let end = new Date(due)

		if(end >= today){
			return 'Active'
		}else{
			return 'Expired'
		}

	}




	addNewPromoCode(){
		
		this.authService.newUser.subscribe(user =>{
			if(user && user.userId && user.type == 'admin'){
				if(this.newPromocodeForm.valid){
					this.productsService.addPromoCode(
						this.newPromocodeForm.get('promoCode').value,
						this.newPromocodeForm.get('discountRatio').value,
						this.newPromocodeForm.get('dateRange').value[0],
						this.newPromocodeForm.get('dateRange').value[1],
					).subscribe((res:any) =>{
						if(res && res.promoCode){
							this.toast.success('Promocode created successfully!');
							this.isModalVisible = false
							this.getAllPromocodes()
							this.initForm()
						}else{
							this.toast.error(res.message);
						}
					})
				}else{
					this.toast.error('Please complete the missing data')
				}
			}
		})
		
	}

	
	getAllPromocodes(){
		this.authService.newUser.subscribe(user =>{
			if(user && user.userId && user.type == 'admin'){
				this.productsService.getAllPromoCodes().subscribe((res:any) =>{
					this.promocodes = []
					if(res){
						this.promocodes = res
					}else{
						this.promocodes = []
					}
				})
			}
		})
	}

	openPromocodeModal(){
		this.isModalVisible = true;
	}

	selectDates(){
	}

}
