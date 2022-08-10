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
        return this.http.post(environment.SERVER_URL + 'addorderinfo/'+userId+'/'+cartItemId,form)
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
        return this.http.put(environment.SERVER_URL + 'editorderItem/'+orderitemid,form)
    }

    checkOutTheOrder(
        userId,
        sessionId,
        contactPhone,
        additionalContactPhone,
        promoCode,
        deliveryLocation,
        feeId
    ){
        return this.http.post(environment.SERVER_URL + 'checkout/'+userId+'/'+sessionId,{
            contactPhone:contactPhone,
            additionalPhone:additionalContactPhone,
            promoCode:promoCode,
            deliveryLocation:deliveryLocation,
            feeId:feeId,
        })
    }

    getOrderinvoice(
        orderid
    ){
        return this.http.get(environment.SERVER_URL + 'orderinvoice/'+orderid)
    }

    getUserSessionOrders(
        userId,
        sessionid
    ){
        return this.http.get(environment.SERVER_URL + 'order/'+userId+'/'+sessionid)
    }

    getAllOrders(){
        return this.http.get(environment.SERVER_URL + 'allorders')
    }

    getLastOrders(){
        return this.http.get(environment.SERVER_URL + 'lastorders')
    }
    
    getTodayOrders(){
        return this.http.get(environment.SERVER_URL + 'todayorders')
        
    }
    
    getWaitingOrders(){
        return this.http.get(environment.SERVER_URL + 'waitingOrders')
        
    }
    
    getConfirmedorders(){
        return this.http.get(environment.SERVER_URL + 'confirmedorders')
        
    }
    
    getInprintingOrders(){
        return this.http.get(environment.SERVER_URL + 'inprintingOrders')

    }

    getOutForDeliveryOrders(){
        return this.http.get(environment.SERVER_URL + 'outfordeliveryorders')
    }

    changeOrderStatus(
        orderPath:'confirmorder' | 'printingorder' | 'outfordeliveryorder' | 'orderdelivered',
        orderId
    ){
        return this.http.patch(environment.SERVER_URL +orderPath+'/'+orderId,{})
    }

    getOrderStatus(orderId){
        return this.http.get(environment.SERVER_URL + 'orderstatus/'+orderId)
    }
    
    getOrderSpecificProductChildrenInfo(
        sessionId,
        cartItemId
    ){
        return this.http.get(environment.SERVER_URL + 'orderiteminfo/'+sessionId+'/'+cartItemId)
    }
    
    getAllOrderChildrenInfo(
        sessionId
    ){
        return this.http.get(environment.SERVER_URL + 'sessionorderitemsinfo/'+sessionId)   
    }
    
    getOrderSpecificProductSpecificChildInfo(
        orderItemId
    ){
        return this.http.get(environment.SERVER_URL + 'iteminfo/'+orderItemId)

    }

    getUserOrders(userId){
        return this.http.get(environment.SERVER_URL + 'userorders/'+userId)
    }

    getAllDeliveryFees(){
        return this.http.get(environment.SERVER_URL + 'alldeliveryFees')
    }

    addDeliveryFees(governorate,fee){
        return this.http.post(environment.SERVER_URL + 'adddeliveryfees',{
            governorate:governorate,
            fee:fee
        })
    }

    editDeliveryFee(feeId,fee){
        return this.http.patch(environment.SERVER_URL + 'editdeliveryfees/'+feeId,{
            fee:fee
        })
    }

   deleteDeliveryFee(feeId){
        return this.http.delete(environment.SERVER_URL + 'deletedeliverfee/'+feeId)
    }




}