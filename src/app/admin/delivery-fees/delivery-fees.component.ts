import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/classes/product';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { ProductService } from 'src/app/shared/services/product.service';


@Component({
	selector: 'admin-delivery-fees',
	templateUrl: './delivery-fees.component.html',
	styleUrls: ['./delivery-fees.component.scss']
})

export class AdminDeliveryFeesComponent implements OnInit {

	deliveryFees:any[] = []

	isModalVisible:boolean = false;

	isUpdateModalVisible:boolean = false;

	loaded =false
	

	selectedFee:any = '';

	newFeeForm:UntypedFormGroup;

	updateFeeForm:UntypedFormGroup;



	constructor(private productsService:ProductService,
		private modalService:ModalService,
		private toast:ToastrService,
		private authService:AuthService,
		private orderService:OrderService) { }

	ngOnInit(): void {
		this.initForm()

		this.updateFeeForm = new UntypedFormGroup({
			fee: new UntypedFormControl(null,[Validators.required,Validators.pattern(/^[0-9]+$/)]),
		})
		
		this.getAllFees()
		
		
	}

	initForm(){
		this.newFeeForm = new UntypedFormGroup({
			area: new UntypedFormControl(null,Validators.required),
			fee: new UntypedFormControl(null,[Validators.required,Validators.pattern(/^[0-9]+$/)]),
		})
	}





	addNewFee(){
		this.authService.newUser.subscribe(user =>{
			if(user && user.userId && user.type == 'admin'){
				if(this.newFeeForm.valid){
					this.orderService.addDeliveryFees(
						this.newFeeForm.get('area').value,
						this.newFeeForm.get('fee').value,
					).subscribe((res:any) =>{
						if(res && res.deliverFee){
							this.toast.success('Fee added successfully!');
							this.isModalVisible = false
							this.getAllFees();
							this.initForm();
						}else if(res && res.message){
							this.toast.error(res.message);
						}
					})
				}else{
					this.toast.error('Please complete the missing data')
				}
			}
		})
		
	}

	
	getAllFees(){
		this.authService.newUser.subscribe(user =>{
			if(user && user.userId && user.type == 'admin'){
				this.orderService.getAllDeliveryFees().subscribe((res:any) =>{
					this.deliveryFees = [];
					if(res && res.deliveryFees){
						this.deliveryFees = res.deliveryFees;
						this.loaded = true
					}else{
						this.deliveryFees = []
					}
				})
			}
		})
	}

	openFeeModal(){
		
		this.isModalVisible = true;
	}

	openUpdateModal(fee){
		this.selectedFee = fee
		this.updateFeeForm = new UntypedFormGroup({
			fee: new UntypedFormControl(fee.fee,[Validators.required,Validators.pattern(/^[0-9]+$/)]),
		})
		this.isUpdateModalVisible = true;

	}

	removeFee(fee){
		this.authService.newUser.subscribe(user =>{
			if(user && user.userId && user.type == 'admin'){
				this.orderService.deleteDeliveryFee(fee.feeId).subscribe((res:any) =>{
					if(res && res.deliverFee){
						this.toast.success('Fee deleted successfully')
						this.getAllFees()
					}else if(res && res.message){
						this.toast.error(res.message);
					}
				})
			}
		})
	}

	updateFee(){
		this.authService.newUser.subscribe(user =>{
			if(user && user.userId && user.type == 'admin'){
				if(this.updateFeeForm.valid){
					this.orderService.editDeliveryFee(
						this.selectedFee.feeId,
						this.updateFeeForm.get('fee').value)
						.subscribe((res:any) =>{
							if(res && res.deliverFee){
								this.toast.success('Fee updated successfully')
								this.getAllFees()
								this.isUpdateModalVisible = false
							}else if(res && res.message){
								this.toast.error(res.message);
							}
						})
				}else{
					this.toast.error('Please complete the missing data')
				}
				
			}
		})
	}

}
