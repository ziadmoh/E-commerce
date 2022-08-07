import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "@abacritt/angularx-social-login";
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

	signupForm:FormGroup

	loginForm:FormGroup

	constructor(private sAuthService: SocialAuthService,
				private inAuthService : AuthService,
				private toast: ToastrService,
				private modalService:ModalService) { }

	ngOnInit(): void {
		this.sAuthService.authState.subscribe((user) => {
			this.socialUser = user;
			this.isLoggedin = user? true:false ;
		});

		this.initSignUp();
		
		this.initLogin();

		
	}

	initSignUp(){
		this.signupForm = new FormGroup({
			fullName: new FormControl(null,[Validators.required]),
			userName: new FormControl(null,Validators.required),
			email:new FormControl(null,[Validators.required,Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
			password:new FormControl(null,[Validators.required,Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
			phone: new FormControl(null,[Validators.required,Validators.pattern(/^(01)[0512][0-9]{8}$/)]),
			userAddress: new FormControl(null),
		})
	}

	initLogin(){
		this.loginForm = new FormGroup({
			'userName': new FormControl(null,[Validators.required]),
			'password': new FormControl(null,[Validators.required])
		})
	}

	signInWithFB(): void {
		this.sAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
	}

	signInWithGoogle(): void {
		this.sAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
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
