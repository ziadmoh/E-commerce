import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ModalService } from 'src/app/shared/services/modal.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { forkJoin } from 'rxjs';

@Component({
	selector: 'app-ecommerce-child-data-modal',
	templateUrl: './child-data-modal.component.html',
	styleUrls: ['./child-data-modal.component.scss']
})

export class ChildDataModalComponent implements OnInit {


	orderItemForm:FormGroup

	orderData:{
		quantity?:number,
		product?:{},
		isBox?:boolean,
		cartItemId?:string,
		session_id?:string
	} = {}

	childLooper:number[] = [];

	childrenPhotos = []

	canEditForm:boolean = false;

	returnedProductChildren = []

	constructor(
				private authService : AuthService,
				private toast: ToastrService,
				private modalService:ModalService,
				private orderService:OrderService) { }

	ngOnInit(): void {
		
		this.orderItemForm = new FormGroup({
			boxChildDataArray: new FormArray([])	
		})
		this.getModalData();
	}


	getModalData(){
	 	this.orderData = this.orderService.orderChildData;
		for(let i=0;i<this.orderData.quantity;i++) {
			this.childLooper.push(i);
			this.childrenPhotos.push(1)
		}
	 
		this.getProductChildData()
	}

	getChildrenGroups(){
		return (this.orderItemForm.get('boxChildDataArray') as FormArray).controls;
	}

	onChangeChildPhoto(event,i){
		if(event && event.files[0]){
			this.childrenPhotos[i] = event.files[0];
			
			const reader = new FileReader();
        	reader.onload = e =>{
				this.orderItemForm.get('boxChildDataArray').get(i.toString())['controls'].childImage.patchValue(
					reader.result
				)
			};
			reader.readAsDataURL(event.files[0]);
		}else{
			this.orderItemForm.get('boxChildDataArray').get(i.toString())['controls'].childImage.patchValue(null)
			this.orderItemForm.get('boxChildDataArray').get(i.toString())['controls'].childImage.markAsTouched()
		}
	}

	addChildGroup(){
		const control = new FormGroup({
			orderItemId: new FormControl(null),
			childName: new FormControl(null, Validators.required),
			schoolName: new FormControl(null, Validators.required),
			favCartoon: new FormControl(null, Validators.required),
			parentPhone: new FormControl(null, [Validators.required,Validators.pattern(/^(01)[0512][0-9]{8}$/)]),
			childImage:new FormControl(null, Validators.required)
		})
		  this.getChildrenGroups().push(control);
	}

	closeModal(){
		let modal = document.querySelector('.child-data-modal') as HTMLElement;
		if (modal){
			this.modalService.closeChildDataModal(modal);
		}
	}

	saveOrderItem(){
		this.orderItemForm.get('boxChildDataArray').updateValueAndValidity()
		let notValidPhoto = this.childrenPhotos.find(photo =>{
			return photo == 1
		})
		 if(this.orderItemForm.valid && !notValidPhoto){
			this.authService.newUser.subscribe(user =>{
				if(user && user.userId){
					let httpRequests =[];
					for(let i=0;i<this.getChildrenGroups().length;i++){
						httpRequests.push(
							this.orderService.addOrderInfo(
								user.userId,
								this.orderData.cartItemId,
								this.orderData.session_id,
								this.getChildrenGroups()[i].value.childName,
								this.childrenPhotos[i],
								this.getChildrenGroups()[i].value.schoolName,
								this.getChildrenGroups()[i].value.favCartoon,
								this.getChildrenGroups()[i].value.parentPhone,
							)
						)
					}
					forkJoin(httpRequests).subscribe((res:any) =>{
						let reArr = []
						res.forEach(single =>{
							if(single && single.orderIteminfo){
								reArr.push('valid')
							}
						})
						if(res && reArr.length == this.orderData.quantity){
							window.location.reload()
							this.toast.success('Saved successfully!');
						}
					});

				}
			})
		}else{
			this.toast.error('Please complete the missing data!');
		}
	}

	updateOrderInfo(){
		this.orderItemForm.get('boxChildDataArray').updateValueAndValidity()
		let notValidPhoto = this.childrenPhotos.find(photo =>{
			return photo == 1
		})
		if(this.orderItemForm.valid ){ //&& !notValidPhoto
			this.authService.newUser.subscribe(user =>{
				if(user && user.userId){
					let httpRequests =[];
					let updateFound;
					for(let i=0;i<this.getChildrenGroups().length;i++){
						updateFound = this.returnedProductChildren.find((item)=>{
							return item.orderItemId == this.getChildrenGroups()[i].get('orderItemId')?.value
						})
						// console.log(updateFound)
						if(updateFound){
							httpRequests.push(
								this.orderService.updateOrderInfo(
									this.getChildrenGroups()[i].value.orderItemId,
									this.getChildrenGroups()[i].value.childName,
									this.getChildrenGroups()[i].value.schoolName,
									this.getChildrenGroups()[i].value.favCartoon,
									this.getChildrenGroups()[i].value.parentPhone,
									this.childrenPhotos[i] == 1 ? null: this.childrenPhotos[i],
								)
							)
						}else{
							httpRequests.push(
								this.orderService.addOrderInfo(
									user.userId,
									this.orderData.cartItemId,
									this.orderData.session_id,
									this.getChildrenGroups()[i].value.childName,
									this.childrenPhotos[i],
									this.getChildrenGroups()[i].value.schoolName,
									this.getChildrenGroups()[i].value.favCartoon,
									this.getChildrenGroups()[i].value.parentPhone,
								)
							)
						}
					}
					
					forkJoin(httpRequests).subscribe((res:any) =>{
						console.log(res)
						let reArr = []
						res.forEach(single =>{
							if(single && (single.orderIteminfo || single.orderItem )){
								reArr.push('valid')
							}
						})
						if(res && reArr.length == this.orderData.quantity){
							this.toast.success('Updated successfully!');
							window.location.reload()
						}
					});
				}
			})		
		}else{
			this.toast.error('Please complete the missing data!');
		}
		
	}

	useSamePhone(i:number,event){
		let parent = document.getElementById('parentPhone'+i) as HTMLInputElement 
		if(event.target.checked){
			this.orderItemForm.get('boxChildDataArray').get(i.toString())['controls'].parentPhone.patchValue(
				this.orderItemForm.get('boxChildDataArray').get('0')['controls'].parentPhone.value
			)
			parent.disabled  = true
		}else{
			this.orderItemForm.get('boxChildDataArray').get(i.toString())['controls'].parentPhone.patchValue(
				null
			)
			parent.disabled  = false
		}
	}
	
	useSameSchool(i:number,event){
		let parent = document.getElementById('schoolName'+i) as HTMLInputElement 
		if(event.target.checked){
			this.orderItemForm.get('boxChildDataArray').get(i.toString())['controls'].schoolName.patchValue(
				this.orderItemForm.get('boxChildDataArray').get('0')['controls'].schoolName.value
			)
			parent.disabled  = true
		}else{
			this.orderItemForm.get('boxChildDataArray').get(i.toString())['controls'].schoolName.patchValue(
				null
			)
			parent.disabled  = false
		}
	}


	getProductChildData(){
		this.orderService.getOrderSpecificProductChildrenInfo(
			this.orderData.session_id,
			this.orderData.cartItemId,
		).subscribe((res:any) =>{
			if(res && res.orderItemInfo){
				this.returnedProductChildren = res.orderItemInfo;
				for(let i=0;i<res.orderItemInfo.length;i++){
					const control = new FormGroup({
						orderItemId: new FormControl(res.orderItemInfo[i].orderItemId?res.orderItemInfo[i].orderItemId:null),
						childName: new FormControl(res.orderItemInfo[i].childName?res.orderItemInfo[i].childName:null, Validators.required),
						schoolName: new FormControl(res.orderItemInfo[i]?res.orderItemInfo[i].schoolName:null, Validators.required),
						favCartoon: new FormControl(res.orderItemInfo[i].favCartoon?res.orderItemInfo[i].favCartoon:null, Validators.required),
						parentPhone: new FormControl(res.orderItemInfo[i].parentPhone?res.orderItemInfo[i].parentPhone:null, [Validators.required,Validators.pattern(/^(01)[0512][0-9]{8}$/)]),
						childImage:new FormControl(res.orderItemInfo[i].childPhoto?res.orderItemInfo[i].childPhoto:null, Validators.required)
					})
				  this.getChildrenGroups().push(control)
				}
				this.canEditForm = true
			}else{
				for(let i=0;i<this.orderData.quantity;i++){
					const control = new FormGroup({
						orderItemId: new FormControl(null),
						childName: new FormControl(null, Validators.required),
						schoolName: new FormControl(null, Validators.required),
						favCartoon: new FormControl(null, Validators.required),
						parentPhone: new FormControl(null, [Validators.required,Validators.pattern(/^(01)[0512][0-9]{8}$/)]),
						childImage:new FormControl(null, Validators.required)
					})
					  this.getChildrenGroups().push(control)
				}
			}
		});
	}

	viewImage(i){
		if(this.canEditForm){
			let image = new Image();
			image.src = this.getChildrenGroups()[i].get('childImage').value
			let _window = window.open('');
			_window.document.write(image.outerHTML);
		}else{
			let _window = window.open(this.getChildrenGroups()[i].get('childImage').value);
		}
	}

	
}
