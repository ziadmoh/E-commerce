import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/classes/product';
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

	newProductForm:FormGroup;

	updateProductForm:FormGroup;

	productImages:any[]= [];

	editProductImages:any[]= [];

	selectedProductImages:any[] = []

	colors:any[] = [
		{name:'Choose a color',value:' ',colorFor:'',disabled:true},
		{name:'Blue (for boys)',value:'blue',colorFor:'boys',disabled:false},
		{name:'Purple (for girls)',value:'purple',colorFor:'girls',disabled:false},
		{name:'Any',value:'any',colorFor:'both',disabled:false},
	]

	categories:any[] =[
		{name:'Choose a category ',value:-1,disabled:true},
		{name:'Box',value:1,disabled:false},
		{name:'Singly',value:0,disabled:false},
	]

	constructor(private productsService:ProductService,
		private modalService:ModalService,
		private toast:ToastrService) { }

	ngOnInit(): void {
		this.newProductForm = new FormGroup({
			productName: new FormControl(null,Validators.required),
			productPrice: new FormControl(null,[Validators.required,Validators.pattern(/^[0-9]+$/)]),
			oldPrice: new FormControl(null,[Validators.required,Validators.pattern(/^[0-9]+$/)]),
			productColor: new FormControl(null,Validators.required),
			
			productDescription: new FormControl(null,Validators.required),
			category: new FormControl(null,Validators.required),
		})

		this.updateProductForm = new FormGroup({
			productName: new FormControl(null,Validators.required),
			productPrice: new FormControl(null,[Validators.required,Validators.pattern(/^[0-9]+$/)]),
			oldPrice: new FormControl(null,[Validators.required,Validators.pattern(/^[0-9]+$/)]),
			productColor: new FormControl(null,Validators.required),
			productCategory: new FormControl(null,Validators.required),
			
			productDescription: new FormControl(null,Validators.required),
		})
		this.getAllProducts()
		
		
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
								this.getAllProducts();
								this.isModalVisible = false;
								this.newProductForm = new FormGroup({
									productName: new FormControl(null,Validators.required),
									productPrice: new FormControl(null,[Validators.required,Validators.pattern(/^[0-9]+$/)]),
									oldPrice: new FormControl(null,[Validators.required,Validators.pattern(/^[0-9]+$/)]),
									productColor: new FormControl(null,Validators.required),
									
									productDescription: new FormControl(null,Validators.required),
									category: new FormControl(null,Validators.required),
								})
								this.productImages = []
							}
						})
					}else{
						this.toast.success('Added Successfully')
						this.isModalVisible = false;
						this.newProductForm = new FormGroup({
							productName: new FormControl(null,Validators.required),
							productPrice: new FormControl(null,[Validators.required,Validators.pattern(/^[0-9]+$/)]),
							oldPrice: new FormControl(null,[Validators.required,Validators.pattern(/^[0-9]+$/)]),
							productColor: new FormControl(null,Validators.required),
							
							productDescription: new FormControl(null,Validators.required),
							category: new FormControl(null,Validators.required),
						})
						this.productImages = []
					}
				}
			})
		}else{
			this.toast.error('Please complete the missing data')
		}
	}

	onEditProduct(product){
		this.editProductImages = []
		this.selectedProduct = product;
		this.updateProductForm = new FormGroup({
			productName: new FormControl(product.productName,Validators.required),
			productPrice: new FormControl(product.productPrice,[Validators.required,Validators.pattern(/^[0-9]+$/)]),
			oldPrice: new FormControl(product.oldPrice,[Validators.required,Validators.pattern(/^[0-9]+$/)]),
			productColor: new FormControl(null,Validators.required),
			productCategory: new FormControl(null,Validators.required),
			
			productDescription: new FormControl(product.productDescription,Validators.required),
		})
		if(product.productColor =='blue'  ){
			this.updateProductForm.get('productColor').patchValue(
				this.colors[1]
			)
		}else if (product.productColor =='purple'){
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
		this.productsService.getProductById(productId).subscribe((res)=>{
			if(res && res.product){
				this.selectedProductImages = res.product.productImages;
			}
		})
	}

	 updateProduct(){
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
					if(res && res.message == "product Updated succssefully"){
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



	getAllProducts(){
		this.productsService.getAllProducts().subscribe(res =>{
			this.products = []
			if(res.products){
				this.products = res.products
			}else{
				this.products = []
			}
		})
	}

	openProductModal(product?){
		this.isModalVisible = true;
	}

	deleteProduct(product){
		this.productsService.removeProduct(product.productId).subscribe((res:any) =>{
			if(res && res.message =="product deleted succssefully"){
				this.toast.success('product deleted succssefully');
				this.getAllProducts();
			}
		})
	}

	deleteImage(image){
		console.log(image)
		this.productsService.removeOneProductImage(image.imageId).subscribe((res:any) =>{
			if(res && res.message == 'image Delete successfully'){
				this.toast.success('Image deleted succssefully');
				this.getProductById(image.product_id);
			}
		})
	}

}
