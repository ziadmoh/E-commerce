import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { Product } from '../classes/product';
import { select, Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { AddToCartAction, RemoveFromCartAction } from 'src/app/core/actions/actions';
import { CartItem } from '../classes/cart-item';
import { cartItemsSelector } from 'src/app/core/selectors/selectors';
import { AuthService } from './auth.service';

@Injectable({
	providedIn: 'root'
})

export class NewCartService {


	public cartStream: Subject<any> = new BehaviorSubject([]);
	public qtyTotal: Subject<number> = new BehaviorSubject(0);
	public priceTotal: Subject<number> = new BehaviorSubject(0);

    public cartItems = new BehaviorSubject<CartItem[]>([]!);
    public numberOfcartItems = new BehaviorSubject<number>(0!);
	
    public cartItemsList:CartItem[] = [] 
    public shippingCost:number = 0;

   // public userSessionId:number =0

    public userSessionId = new BehaviorSubject(0);

    public cartSubTotal = new BehaviorSubject<number>(0!);
    
    constructor(private http: HttpClient,private store: Store<any>, 
        private toastrService: ToastrService,
        private authService:AuthService) {
        
        this.authService.newUser.subscribe(user =>{
            if(user && user.userId){
                this.getOpenedSession(user.userId).subscribe((res:any) =>{
                    if(res && res.session ){
                        this.userSessionId.next(res.session.sessionId)
                        this.getCartItems(res.session.sessionId).subscribe(items=>{
                            
                        })
                    }else{
                        this.openSession(user.userId).subscribe((opened:any) =>{
                            this.userSessionId.next(opened.session.sessionId)
                            if(opened && opened.session){
                                this.getCartItems(opened.session.sessionId).subscribe(items=>{
            
                                })
                            }
                        })
                    }
                })
            }
        })
    
        
    }

    getOpenedSession(userId){
        return this.http.get(environment.SERVER_URL + 'usersession/'+userId)
    }



    openSession(userId){
        return this.http.post(environment.SERVER_URL +'opensession/'+userId,{})
    }

    addToCart(userId,product,qty,sessionId){
        return this.http.post(environment.SERVER_URL +'addtocart/'+userId+'/'+product.productId,{
            quantity:qty,
            session_id:sessionId
        }).pipe(tap((res:any)=>{

            let found:any =   this.cartItemsList.find((i:any) =>{
                return i.product_id == product.productId
            })
            
            if (found && found.product_id) {
                this.toastrService.error('This Product is already in the cart!');
            } else {
                this.store.dispatch(new AddToCartAction({ product, qty }));
                this.toastrService.success('Product added to Cart.');
            }

            
        }))
    }


    removeFromCart(userId,product,sessionId){
        return this.http.request('delete',environment.SERVER_URL +'deletecartitem/'+userId+'/'+product.productId,{
           body:{ sessionId:sessionId}
        })
        .pipe(tap((res:any)=>{
            if(res && res.message == 'cart item is deleted successfully'){
                this.store.dispatch(new RemoveFromCartAction({ product }));
                this.toastrService.success('Product removed from Cart.');
            }
        }))
    }

    getCartItems(sessionId){
        return this.http.get(environment.SERVER_URL + 'sessioncartItems/'+sessionId).pipe(
            tap((items:any) =>{
                if(items && items.sessionCartItems){
                    this.cartItems.next(items.sessionCartItems);
                    let itemsCount = 0
                    let subTotal = 0
                    for(let i=0 ; i<items.sessionCartItems.length;i++){
                        itemsCount = itemsCount + items.sessionCartItems[i].quantity
                        // this.numberOfcartItems = this.numberOfcartItems + items.sessionCartItems[i].quantity
                        subTotal = subTotal + items.sessionCartItems[i].price
                    }
    
                    this.numberOfcartItems.next(itemsCount)
    
                    this.cartSubTotal.next(subTotal)
    
                    this.cartStream.next(items.sessionCartItems);
    
                    
                }else{
                    this.cartItems.next([])
                    this.numberOfcartItems.next(0)
                }
            })
        )
    }


    editCartItemQuantity(userId,product,qty,sessionId){
        return this.http.patch(environment.SERVER_URL + 'editquantity/'+userId+'/'+product.productId,{
            quantity:qty,
            sessionId:sessionId
        })
    }


}