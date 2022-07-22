import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { Product } from '../classes/product';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { AddToCartAction } from 'src/app/core/actions/actions';

@Injectable({
	providedIn: 'root'
})

export class NewCartService {

	constructor(private http: HttpClient,private store: Store<any>, private toastrService: ToastrService) {
	}

    openSession(userId){
        return this.http.post(environment.SERVER_URL +'opensession/'+userId,{})
    }

    addToCart(userId,product,qty,sessionId){
        return this.http.post(environment.SERVER_URL +'addtocart/'+userId+'/'+product.productId,{
            quantity:qty,
            session_id:sessionId
        }).pipe(tap((res:any)=>{
            this.store.dispatch(new AddToCartAction({ product, qty }));
			this.toastrService.success('Product added to Cart.');
        }))
    }


}