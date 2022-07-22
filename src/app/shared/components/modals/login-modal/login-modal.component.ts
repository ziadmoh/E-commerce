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
			'fullName': new FormControl(null,[Validators.required]),
			'userAddress': new FormControl(null,[Validators.required]),
			'phone': new FormControl(null,Validators.required),
			'userName': new FormControl(null,Validators.required),
			'email':new FormControl(null,Validators.required),
			'password':new FormControl(null,Validators.required)
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
		this.inAuthService.userSignup(this.signupForm.value).subscribe(res =>{
		//	console.log(res)
		})
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
