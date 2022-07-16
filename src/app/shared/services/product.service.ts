import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

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

	getAllProducts(){
        return this.http.get(environment.SERVER_URL +'allproducts' ).pipe(
            tap((res:any) =>{
                if(res.products){
                    this.allProducts = res.boxProducts
                }else{
                    this.allProducts = []
                }
            }
        ))
    }

	getBoxProducts(){
        return this.http.get(environment.SERVER_URL +'boxproducts').pipe(
            tap((res:any) =>{
                if(res.boxProducts){
                    this.boxProducts = res.boxProducts
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

    addProduct(image){
        let form = new FormData()
        form.append('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJ1c2VyTmFtZSI6Ik1NTSIsImlhdCI6MTY1NjQzOTQwOX0.Ksue0mqCQr7wdj9j1MKL_XWjjhcE6i4ApoqVqENHO6c')
        form.append('productName','prod 3')
        form.append('productColor','pink')
        form.append('productImage',image)
        form.append('productDescription','lorem ipsum')
        form.append('productPrice','34')
        form.append('box','1')
        return this.http.post(environment.SERVER_URL +'addproduct',form)
    }
}