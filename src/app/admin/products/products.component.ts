import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/classes/product';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { ProductService } from 'src/app/shared/services/product.service';


@Component({
	selector: 'admin-products',
	templateUrl: './products.component.html',
	styleUrls: ['./products.component.scss']
})

export class AdminProductsComponent implements OnInit {

	products:Product[] = []

	isModalVisible:boolean = false;
	
	isEditModalVisible:boolean = false;

	selectedProduct:any = '';

	newProductForm:UntypedFormGroup;

	updateProductForm:UntypedFormGroup;

	productImages:any[]= [];

	editProductImages:any[]= [];

	selectedProductImages:any[] = []

	colors:any[] = [
		{name:'Choose a color',value:' ',colorFor:'',disabled:true},
		{name:'Blue (for boys)',value:'blue',colorFor:'boys',disabled:false},
		{name:'Pink (for girls)',value:'pink',colorFor:'girls',disabled:false},
		{name:'Any',value:'any',colorFor:'both',disabled:false},
	]

	categories:any[] =[
		{name:'Choose a category ',value:-1,disabled:true},
		{name:'Box',value:1,disabled:false},
		{name:'Other products',value:0,disabled:false},
	]

	constructor(private productsService:ProductService,
		private modalService:ModalService,
		private toast:ToastrService,
		private authService:AuthService) { }

	ngOnInit(): void {
		this.initForm()

		this.updateProductForm = new UntypedFormGroup({
			productName: new UntypedFormControl(null,[Validators.required,Validators.min(3)]),
			productPrice: new UntypedFormControl(null,[Validators.required,Validators.pattern(/^[0-9]+$/)]),
			oldPrice: new UntypedFormControl(null,[Validators.pattern(/^[0-9]+$/)]),
			productColor: new UntypedFormControl(null,Validators.required),
			productCategory: new UntypedFormControl(null,Validators.required),
			
			productDescription: new UntypedFormControl(null,Validators.required),
		})
		this.getAllProducts()
		
		
	}

	initForm(){
		this.newProductForm = new UntypedFormGroup({
			productName: new UntypedFormControl(null,[Validators.required,Validators.min(3)]),
			productPrice: new UntypedFormControl(null,[Validators.required,Validators.pattern(/^[0-9]+$/)]),
			oldPrice: new UntypedFormControl(null,[Validators.pattern(/^[0-9]+$/)]),
			productColor: new UntypedFormControl(null,Validators.required),
			
			productDescription: new UntypedFormControl(null,Validators.required),
			category: new UntypedFormControl(null,Validators.required),
		})
	}

	onChangeProductPhots(event){
		for(let file of event.files) {
            this.productImages.push(file);
        }
	}

	onChangeEditProductPhotos(event){
		for(let file of event.files) {
            this.editProductImages.push(file);
        }
	}



	addNewProduct(){
		this.authService.newUser.subscribe(user =>{
			if(user && user.userId && user.type == 'admin'){
				if(this.newProductForm.valid && this.productImages.length >0){
					this.productsService.addProduct(
						this.newProductForm.get('productName').value,
						this.newProductForm.get('productColor').value.value,
						this.productImages[0] ,
						this.newProductForm.get('productDescription').value,
						this.newProductForm.get('productPrice').value,
						this.newProductForm.get('oldPrice').value,
						this.newProductForm.get('category').value.value,
					).subscribe((res:any) =>{
						if(res && res.product){
							if(this.productImages.length>1){
								this.productsService.addProductImages(
									res.product.productId,
									this.productImages.slice(1)
								).subscribe((imgRes:any) =>{
									if(imgRes && imgRes.images){
										this.toast.success('Added Successfully')
										this.newProductForm.setValue({
											productName: null,
											productPrice: null,
											oldPrice: null,
											productColor: null,
											
											productDescription: null,
											category: null,
										})
										this.getAllProducts();
										this.isModalVisible = false;
										this.productImages = []
										
										
									}
								})
							}else{
								this.toast.success('Added Successfully')
								this.isModalVisible = false;
								this.newProductForm.setValue({
									productName: null,
									productPrice: null,
									oldPrice: null,
									productColor: null,
									
									productDescription: null,
									category: null,
								})
								this.getAllProducts()
								this.productImages = []
							}
						}else if (res && res.message){
							this.toast.error(res.message)
						}
					})
				}else{
					this.toast.error('Please complete the missing data')
				}
			}
		})
		
	}

	onEditProduct(product){
		this.editProductImages = []
		this.selectedProduct = product;
		this.updateProductForm = new UntypedFormGroup({
			productName: new UntypedFormControl(product.productName,Validators.required),
			productPrice: new UntypedFormControl(product.productPrice,[Validators.required,Validators.pattern(/^[0-9]+$/)]),
			oldPrice: new UntypedFormControl(product.oldPrice,[Validators.pattern(/^[0-9]+$/)]),
			productColor: new UntypedFormControl(null,Validators.required),
			productCategory: new UntypedFormControl(null,Validators.required),
			
			productDescription: new UntypedFormControl(product.productDescription,Validators.required),
		})
		if(product.productColor =='blue'  ){
			this.updateProductForm.get('productColor').patchValue(
				this.colors[1]
			)
		}else if (product.productColor =='pink'){
			this.updateProductForm.get('productColor').patchValue(
				this.colors[2]
			)
		}else{
			this.updateProductForm.get('productColor').patchValue(
				this.colors[3]
			)
		}	

		if(product.box ==1  ){
			this.updateProductForm.get('productCategory').patchValue(
				this.categories[1]
			)
		}else if (product.box == 0){
			this.updateProductForm.get('productCategory').patchValue(
				this.categories[2]
			)
		}else{
			this.updateProductForm.get('productCategory').patchValue(
				this.categories[0]
			)
		}	
		
		this.isEditModalVisible = true
		this.getProductById(product.productId)
		
	}
	getProductById(productId){
		this.authService.newUser.subscribe(user =>{
			if(user && user.userId && user.type == 'admin'){
				this.productsService.getProductById(productId).subscribe((res)=>{
					if(res && res.product){
						this.selectedProductImages = res.product.productImages;
					}else if (res && res.message){
						this.toast.error(res.message)
					}
				})
			}
		})
		
	}

	 updateProduct(){
		this.authService.newUser.subscribe(user =>{
			if(user && user.userId && user.type == 'admin'){
				if(this.updateProductForm.valid){
					this.productsService.editProduct(
						this.selectedProduct.productId,
						this.updateProductForm.get('productName').value,
						this.updateProductForm.get('productColor').value.value,
						this.updateProductForm.get('productDescription').value,
						this.updateProductForm.get('productPrice').value,
						this.updateProductForm.get('oldPrice').value,
						this.editProductImages[0],
					).subscribe((res:any) =>{
						if(res && res.product){
							if(this.editProductImages.length >1){
								this.productsService.addProductImages(
									this.selectedProduct.productId,
									this.editProductImages.slice(1)
								).subscribe((imgRes:any) =>{
									if(imgRes && imgRes.images){
										this.toast.success('Updated Successfully')
										this.getAllProducts();
										this.editProductImages = []
										this.isEditModalVisible = false;
									}
								})
							}else{
								this.toast.success('Updated Successfully')
								this.getAllProducts();
								this.editProductImages = []
								this.isEditModalVisible = false;
							}
							
						}else{
							this.toast.success('Updated Successfully')
							this.getAllProducts();
							this.isEditModalVisible = false;
							this.editProductImages = []
						}
					})
				
			}else{
				this.toast.error('Please complete the missing data')
			}
			}
		})
		
	 }



	getAllProducts(){
		this.authService.newUser.subscribe(user =>{
			if(user && user.userId && user.type == 'admin'){
				this.productsService.getAllProducts().subscribe(res =>{
					this.products = []
					if(res.products){
						this.products = res.products
					}else{
						this.products = []
					}
				})
			}
		})
		
	}

	openProductModal(product?){
		this.isModalVisible = true;
	}

	deleteProduct(product){
		this.authService.newUser.subscribe(user =>{
			if(user && user.userId && user.type == 'admin'){
				this.productsService.removeProduct(product.productId).subscribe((res:any) =>{
					if(res && res.product){
						this.toast.success('product deleted succssefully');
						this.getAllProducts();
					}else if (res && res.message){
						this.toast.error(res.message)
					}
				})
			}
		})
	}

	deleteImage(image){
		this.authService.newUser.subscribe(user =>{
			if(user && user.userId && user.type == 'admin'){
				this.productsService.removeOneProductImage(image.imageId).subscribe((res:any) =>{
					if(res && res.message == 'image Delete successfully'){
						this.toast.success('Image deleted succssefully');
						this.getProductById(image.product_id);
					}
				})
			}
		})
		
	}

}
