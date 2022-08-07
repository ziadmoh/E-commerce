import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs/operators';
import { Product } from '../classes/product';

@Injectable({
	providedIn: 'root'
})

export class ProductService {

	constructor(private http: HttpClient) {
	}

    allProducts:[] = []

    singlyProducts:[] = []

    boxProducts:[] =[]

    boxProductsLength:number = 0;

    normalProductsLength:number = 0;

    selectedProduct:Product

	getAllProducts(){
        return this.http.get(environment.SERVER_URL +'allproducts' ).pipe(
            tap((res:any) =>{
                if(res.products){
                    this.boxProducts = []
                    this.singlyProducts = []
                    this.allProducts = res.products;
                }else{
                    this.allProducts = []
                }
            }
        ))
    }

	getAllPromoCodes(){
        return this.http.get(environment.SERVER_URL +'allpromocodes' )
    }


    addPromoCode(
        promoCode,
        discountRatio,
        startDate,
        dueDate
    ){
        return this.http.post(environment.SERVER_URL +'createpromocode',{
            promoCode:promoCode,
            discountRatio:discountRatio,
            startDate:startDate,
            dueDate:dueDate,

        } )
    }
    

	getBoxProducts(){
        return this.http.get(environment.SERVER_URL +'boxproducts').pipe(
            tap((res:any) =>{
                if(res.boxProducts){
                    this.boxProducts = res.boxProducts
                    this.boxProducts.map((product:{})=>{
                        return product['box'] = 0
                    })
                }else{
                    this.boxProducts = []
                }
            }
        ))
    }

	getSinglyProducts(){
        return this.http.get(environment.SERVER_URL +'normalproducts').pipe(
            tap((res:any) =>{
                if(res.normalProducts){
                    this.singlyProducts = res.normalProducts
                }else{
                    this.singlyProducts = []
                }
            }
        ))
    }

    getBoxProductsLength(){
        return this.http.get(environment.SERVER_URL +'boxproductnum').pipe(
            tap((res:any) =>{
                if(res && res.numberOfBox){
                    this.boxProductsLength = res.numberOfBox
                }
            }
        ))
    }

    getNormalProductsLength(){
        return this.http.get(environment.SERVER_URL +'normalproductnum').pipe(
            tap((res:any) =>{
                if(res && res.numberOfNormal){
                    this.normalProductsLength = res.numberOfNormal
                }
            }
        ))
    }

    addProduct(
        productName,
        productColor,
        productImage,
        productDescription,
        productPrice,
        oldPrice,
        box,
    ){
        let form = new FormData()
        form.append('productName',productName)
        form.append('productColor',productColor)
        form.append('productImage',productImage)
        form.append('productDescription',productDescription)
        form.append('productPrice',productPrice)
        form.append('oldPrice',oldPrice)
        form.append('box',box)
        return this.http.post(environment.SERVER_URL +'addproduct',form)
    }

    addProductImages(productId,images){
        let form = new FormData();
        for(let i=0;i<images.length;i++){

            form.append('image'+[i],images[i])
        }
        
        return this.http.post(environment.SERVER_URL +'addproductimages/'+productId,form)
    }

    removeProduct(productId){
        return this.http.patch(environment.SERVER_URL +'deleteproduct/'+productId,{})
    }

    rateProduct(
        userId,
        productId,
        rate: 1 | 2 | 3 | 4 | 5
    ){
        return this.http.post(environment.SERVER_URL +'assignrate/'+userId+'/'+productId,{
            rate:rate
        })
    }

    editProduct(
        productId,
        productName,
        productColor,
        productDescription,
        productPrice,
        oldPrice,
        productImage?,
    ){
        let form = new FormData()
        form.append('productName',productName)
        form.append('productColor',productColor)
        form.append('productDescription',productDescription)
        form.append('productPrice',productPrice)
        form.append('oldPrice',oldPrice)
        form.append('productImage',productImage)
        return this.http.put(environment.SERVER_URL +'editproduct/'+productId,form)
    }

    removeOneProductImage(
        imageId
    ){
        return this.http.delete(environment.SERVER_URL +'deleteimage/'+imageId)
    }

    removeAllProductImages(productId){
        return this.http.delete(environment.SERVER_URL +'deleteproductimages/'+productId)
    }

    getProductById(productId){
        return this.http.get(environment.SERVER_URL +'product/'+productId)
        .pipe(
                tap((res:any) =>{
                        if(res && res.product){
                            let modefied:Product = res.product;
                            // console.log(res.product)
                            if(modefied.productImages){
                                modefied.productImages.unshift({
                                    imageId:0,
                                    image:res.product.productImage,
                                    product_id:res.product.productId
                                })
                            }else{
                                modefied.productImages = []
                                modefied.productImages[0] = {
                                    imageId:0,
                                    image:res.product.productImage,
                                    product_id:res.product.productId
                                }
                            }
                            
                           // console.log(modefied)
                            this.selectedProduct = modefied
                            return modefied;

                        }else{
                            return {}
                        }
                    }
                )
        )
    }

    getImageFromUrl(url){
        return this.http.get(url,{responseType: "blob"})
    }
}