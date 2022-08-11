import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { UserService } from 'src/app/shared/services/user.service';


@Component({
	selector: 'admin-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.scss']
})

export class AdminUsersComponent implements OnInit {

	users:any[] = []

	isModalVisible:boolean = false;

	newUserForm:UntypedFormGroup;

	userTypes  = [
		{name:'Admin',value:'admin'},
		{name:'Client',value:'client'}]
	
	selectedFilter:{name:string,value:string,disabled:boolean} = {name:'All users',value:'all',disabled:false}
	
	prevSelectedFilter:{name:string,value:string,disabled:boolean} = {name:'All users',value:'all',disabled:false}
	
	filerOptions:any[] =[
		{name:'All users',value:'all',disabled:false},
		{name:'All clients',value:'clients',disabled:false},
		{name:'All admins',value:'admins',disabled:false},
	]

	constructor(
		private modalService:ModalService,
		private toast:ToastrService,
		private userService:UserService,
		private authService:AuthService) { }

	ngOnInit(): void {
		this.initForm()
		
		this.getAllUsers()
		
	}

	initForm(){
		this.newUserForm = new UntypedFormGroup({
			fullName: new UntypedFormControl(null,Validators.required),
			userName: new UntypedFormControl(null,Validators.required),
			email: new UntypedFormControl(null,[Validators.required,Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
			password: new UntypedFormControl(null,[Validators.required,Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
			phone: new UntypedFormControl(null,[Validators.required,Validators.pattern(/^(01)[0512][0-9]{8}$/)]),
			type: new UntypedFormControl({name:'Admin',value:'admin'},Validators.required),
			address: new UntypedFormControl(null)
		})
	}

	getAllUsers(){
		this.authService.newUser.subscribe(user =>{
			if(user && user.userId && user.type == 'admin'){
				this.userService.getAllUsers().subscribe((res:any) =>{
					if(res && res.allUsers){
						this.users = res.allUsers;
					}else {
						this.users = []
					}
				})
			}
		})
	}

	getAllAdmins(){
		this.authService.newUser.subscribe(user =>{
			if(user && user.userId && user.type == 'admin'){
				this.userService.getAllAdmins().subscribe((res:any) =>{
					if(res && res.allAdmins){
						this.users = res.allAdmins;
					}else {
						this.users = []
					}
				})
			}
		})
	}

	getAllClients(){
		this.authService.newUser.subscribe(user =>{
			if(user && user.userId && user.type == 'admin'){
				this.userService.getAllClients().subscribe((res:any) =>{
					if(res && res.allClients){
						this.users = res.allClients;
					}else {
						this.users = []
					}
				})
			}
		})
	}


	ChangeFiler(event){

		if(this.prevSelectedFilter.value !== this.selectedFilter.value){
			this.checkSelectedFilter()
		}
		this.prevSelectedFilter = {...this.selectedFilter}
	}

	checkSelectedFilter(){
		if(this.selectedFilter.value == 'all'){
			this.getAllUsers()
			
		}else if (this.selectedFilter.value == 'clients'){
			this.getAllClients()
		}else if (this.selectedFilter.value == 'admins'){
			this.getAllAdmins()
		}
	}

	addNewUser(){
		this.authService.newUser.subscribe(user =>{
			if(user && user.userId && user.type == 'admin'){
				if(this.newUserForm.valid){
					let form = {
						fullName:this.newUserForm.get('fullName').value,
						userName:this.newUserForm.get('userName').value,
						email:this.newUserForm.get('email').value,
						password:this.newUserForm.get('password').value,
						type:this.newUserForm.get('type').value.value,
						phone:this.newUserForm.get('phone').value,
					}
					if(this.newUserForm.get('address').value){
						form['address']= this.newUserForm.get('address').value
					}
					
					this.userService.createUser(form).subscribe((res:any)=>{
						if(res && res.user){
							this.toast.success('Created Successfully!');
							this.newUserForm.setValue({
								fullName: null,
								userName: null,
								email: null,
								password: null,
								phone: null,
								type: null,
								address: null
							})
							this.isModalVisible = false;
							this.checkSelectedFilter()
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

	openNewUserModal(){
		this.isModalVisible = true;
	}



}
