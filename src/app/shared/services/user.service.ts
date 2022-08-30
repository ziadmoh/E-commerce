import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { ToastrService } from 'ngx-toastr';

@Injectable({
	providedIn: 'root'
})

export class UserService {


    
    
    constructor(private http: HttpClient,
        private toastrService: ToastrService) {
        
    }



    getAllUsers(){
        return this.http.get(environment.SERVER_URL + 'allusers').pipe(
            tap(next =>{},err=>{
                this.toastrService.error('Server Error!')
            })
        )
    }

    getAllAdmins(){
        return this.http.get(environment.SERVER_URL + 'alladmins').pipe(
            tap(next =>{},err=>{
                this.toastrService.error('Server Error!')
            })
        )
    }
    
    getAllClients(){
        return this.http.get(environment.SERVER_URL + 'allclients').pipe(
            tap(next =>{},err=>{
                this.toastrService.error('Server Error!')
            })
        )
    }

    createUser(
        form:{
            fullName,
            userName,
            email,
            password,
            type,
            phone,
            address?,
        }
        
    ){
        let submittedForm = {
            fullName:form.fullName,
            userName:form.userName,
            email:form.email,
            password:form.password,
            type:form.type,
            phone:form.phone,
        }
        if(form.address){
            submittedForm['address']= form.address
        }
        
        return this.http.post(environment.SERVER_URL + 'createuser',submittedForm).pipe(
            tap(next =>{},err=>{
                this.toastrService.error('Server Error!')
            })
        )
    }
    
   



}