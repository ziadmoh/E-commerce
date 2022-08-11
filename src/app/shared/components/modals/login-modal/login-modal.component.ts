import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "@abacritt/angularx-social-login";
import { AuthService } from 'src/app/shared/services/auth.service';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
	selector: 'app-ecommerce-login-modal',
	templateUrl: './login-modal.component.html',
	styleUrls: ['./login-modal.component.scss']
})

export class LoginModalComponent implements OnInit {

	socialUser!: SocialUser;

  	isLoggedin?: boolean = false;

	signupForm:UntypedFormGroup

	loginForm:UntypedFormGroup

	constructor(private sAuthService: SocialAuthService,
				private inAuthService : AuthService,
				private toast: ToastrService,
				private modalService:ModalService) { }

	ngOnInit(): void {
		this.sAuthService.authState.subscribe((user) => {
			this.socialUser = user;
			if(this.socialUser && this.socialUser.email){
				this.inAuthService.socialSignup({
					first_name:this.socialUser.firstName,
					last_name:this.socialUser.lastName,
					email:this.socialUser.email,
					name:this.socialUser.name,
					social_id:this.socialUser.id,
					provider:this.socialUser.provider,
				}).subscribe()
			}	
			this.isLoggedin = user? true:false ;
		});

		this.initSignUp();
		
		this.initLogin();

		
	}

	initSignUp(){
		this.signupForm = new UntypedFormGroup({
			fullName: new UntypedFormControl(null,[Validators.required]),
			userName: new UntypedFormControl(null,Validators.required),
			email:new UntypedFormControl(null,[Validators.required,Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
			password:new UntypedFormControl(null,[Validators.required,Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
			phone: new UntypedFormControl(null,[Validators.required,Validators.pattern(/^(01)[0512][0-9]{8}$/)]),
			userAddress: new UntypedFormControl(null),
		})
	}

	initLogin(){
		this.loginForm = new UntypedFormGroup({
			'userName': new UntypedFormControl(null,[Validators.required]),
			'password': new UntypedFormControl(null,[Validators.required])
		})
	}

	signInWithFB(): void {
		this.sAuthService.signIn(FacebookLoginProvider.PROVIDER_ID)
	}

	googleLoginOptions = {
		scope: 'ziadyahya01001@gmail.com'
	  }; // https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiauth2clientconfig
	  
		


	signInWithGoogle(): void {
		this.sAuthService.signIn(GoogleLoginProvider.PROVIDER_ID,this.googleLoginOptions)
	}

	signOut(): void {
		this.sAuthService.signOut();
	}

	closeModal() {
		let modal = document.querySelector('.login-modal') as HTMLElement;
		if (modal){
			this.modalService.closeLoginModal(modal);
		}
	}

	onSubmitSignup(){
		if(this.signupForm.valid){
			this.inAuthService.userSignup(this.signupForm.value).subscribe(res =>{
				if(res && res.user){
					this.isLoggedin = true;
				}else if (res && res.message){
					this.toast.error(res.message)
				}
			})
		}else{
			this.toast.error('Please complete the missing data')
		}
		
	}

	onSubmitLogin(event:Event){
		event.preventDefault()
		this.inAuthService.login(this.loginForm.value).subscribe(res =>{
			if(res.userInfo && res.userInfo.userId){
				this.isLoggedin = true;
			}else{
				this.isLoggedin = false;
			}
		})
		
	}

	
}
