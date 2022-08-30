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

@Injectable({
	providedIn: 'root'
})

export class OrderService {


    public orderChildData:{} ={};

    public canCheckOut = new BehaviorSubject<boolean>(false!);
    
    constructor(private http: HttpClient,private store: Store<any>, private toastrService: ToastrService) {
        
    }

    addOrderInfo(
        userId,
        cartItemId,
        sessionId,
        childName,
        childImage,
        schoolName,
        favCartoon,
        parentPhone
    ){
        const form = new FormData()
        form.append('sessionId',sessionId)
        form.append('childName',childName)
        form.append('schoolName',schoolName)
        form.append('favCartoon',favCartoon)
        form.append('parentPhone',parentPhone)
        form.append('childImage',childImage)
        return this.http.post(environment.SERVER_URL + 'addorderinfo/'+userId+'/'+cartItemId,form).pipe(
            tap(next =>{},err=>{
                this.toastrService.error('Server Error!')
            })
        )
    }
    updateOrderInfo(
        orderitemid,
        childName,
        schoolName,
        favCartoon,
        parentPhone,
        childImage?,
    ){
        const form = new FormData()
        form.append('childName',childName)
        form.append('schoolName',schoolName)
        form.append('favCartoon',favCartoon)
        form.append('parentPhone',parentPhone)
        form.append('childImage',childImage)
        return this.http.put(environment.SERVER_URL + 'editorderItem/'+orderitemid,form).pipe(
            tap(next =>{},err=>{
                this.toastrService.error('Server Error!')
            })
        )
    }

    checkOutTheOrder(
        userId,
        sessionId,
        contactPhone,
        additionalContactPhone,
        promoCode,
        deliveryLocation,
        feeId,
        notes?
    ){
        let form = {
            contactPhone:contactPhone,
            additionalPhone:additionalContactPhone,
            promoCode:promoCode,
            deliveryLocation:deliveryLocation,
            feeId:feeId,
        }
        if(notes){
            form['notes'] = notes
        }
        return this.http.post(environment.SERVER_URL + 'checkout/'+userId+'/'+sessionId,form).pipe(
            tap(next =>{},err=>{
                this.toastrService.error('Server Error!')
            })
        )
    }

    getOrderinvoice(
        orderid
    ){
        return this.http.get(environment.SERVER_URL + 'orderinvoice/'+orderid).pipe(
            tap(next =>{},err=>{
                this.toastrService.error('Server Error!')
            })
        )
    }

    getUserSessionOrders(
        userId,
        sessionid
    ){
        return this.http.get(environment.SERVER_URL + 'order/'+userId+'/'+sessionid).pipe(
            tap(next =>{},err=>{
                this.toastrService.error('Server Error!')
            })
        )
    }

    getAllOrders(){
        return this.http.get(environment.SERVER_URL + 'allorders').pipe(
            tap(next =>{},err=>{
                this.toastrService.error('Server Error!')
            })
        )
    }

    getLastOrders(){
        return this.http.get(environment.SERVER_URL + 'lastorders').pipe(
            tap(next =>{},err=>{
                this.toastrService.error('Server Error!')
            })
        )
    }
    
    getTodayOrders(){
        return this.http.get(environment.SERVER_URL + 'todayorders').pipe(
            tap(next =>{},err=>{
                this.toastrService.error('Server Error!')
            })
        )
        
    }
    
    getWaitingOrders(){
        return this.http.get(environment.SERVER_URL + 'waitingOrders').pipe(
            tap(next =>{},err=>{
                this.toastrService.error('Server Error!')
            })
        )
        
    }
    
    getConfirmedorders(){
        return this.http.get(environment.SERVER_URL + 'confirmedorders').pipe(
            tap(next =>{},err=>{
                this.toastrService.error('Server Error!')
            })
        )
        
    }
    
    getInprintingOrders(){
        return this.http.get(environment.SERVER_URL + 'inprintingOrders').pipe(
            tap(next =>{},err=>{
                this.toastrService.error('Server Error!')
            })
        )

    }

    getOutForDeliveryOrders(){
        return this.http.get(environment.SERVER_URL + 'outfordeliveryorders').pipe(
            tap(next =>{},err=>{
                this.toastrService.error('Server Error!')
            })
        )
    }

    changeOrderStatus(
        orderPath:'confirmorder' | 'printingorder' | 'outfordeliveryorder' | 'orderdelivered',
        orderId
    ){
        return this.http.patch(environment.SERVER_URL +orderPath+'/'+orderId,{}).pipe(
            tap(next =>{},err=>{
                this.toastrService.error('Server Error!')
            })
        )
    }

    getOrderStatus(orderId){
        return this.http.get(environment.SERVER_URL + 'orderstatus/'+orderId).pipe(
            tap(next =>{},err=>{
                this.toastrService.error('Server Error!')
            })
        )
    }
    
    getOrderSpecificProductChildrenInfo(
        sessionId,
        cartItemId
    ){
        return this.http.get(environment.SERVER_URL + 'orderiteminfo/'+sessionId+'/'+cartItemId).pipe(
            tap(next =>{},err=>{
                this.toastrService.error('Server Error!')
            })
        )
    }
    
    getAllOrderChildrenInfo(
        sessionId
    ){
        return this.http.get(environment.SERVER_URL + 'sessionorderitemsinfo/'+sessionId).pipe(
            tap(next =>{},err=>{
                this.toastrService.error('Server Error!')
            })
        )   
    }
    
    getOrderSpecificProductSpecificChildInfo(
        orderItemId
    ){
        return this.http.get(environment.SERVER_URL + 'iteminfo/'+orderItemId).pipe(
            tap(next =>{},err=>{
                this.toastrService.error('Server Error!')
            })
        )

    }

    getUserOrders(userId){
        return this.http.get(environment.SERVER_URL + 'userorders/'+userId).pipe(
            tap(next =>{},err=>{
                this.toastrService.error('Server Error!')
            })
        )
    }

    getAllDeliveryFees(){
        return this.http.get(environment.SERVER_URL + 'alldeliveryFees').pipe(
            tap(next =>{},err=>{
                this.toastrService.error('Server Error!')
            })
        )
    }

    addDeliveryFees(governorate,fee){
        return this.http.post(environment.SERVER_URL + 'adddeliveryfees',{
            governorate:governorate,
            fee:fee
        }).pipe(
            tap(next =>{},err=>{
                this.toastrService.error('Server Error!')
            })
        )
    }

    editDeliveryFee(feeId,fee){
        return this.http.patch(environment.SERVER_URL + 'editdeliveryfees/'+feeId,{
            fee:fee
        }).pipe(
            tap(next =>{},err=>{
                this.toastrService.error('Server Error!')
            })
        )
    }

   deleteDeliveryFee(feeId){
        return this.http.delete(environment.SERVER_URL + 'deletedeliverfee/'+feeId).pipe(
            tap(next =>{},err=>{
                this.toastrService.error('Server Error!')
            })
        )
    }




}