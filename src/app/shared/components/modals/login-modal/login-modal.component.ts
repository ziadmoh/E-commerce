import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "@abacritt/angularx-social-login";
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-ecommerce-login-modal',
	templateUrl: './login-modal.component.html',
	styleUrls: ['./login-modal.component.scss']
})

export class LoginModalComponent implements OnInit {
	socialUser!: SocialUser;
  	isLoggedin?: boolean = undefined;

	signupForm:FormGroup

	constructor(private sAuthService: SocialAuthService,
				private inAuthService : AuthService) { }

	ngOnInit(): void {
		this.sAuthService.authState.subscribe((user) => {
			this.socialUser = user;
			this.isLoggedin = user != null;
		  });

		this.signupForm = new FormGroup({
			'fullName': new FormControl(null,[Validators.required]),
			'userAddress': new FormControl(null,[Validators.required]),
			'phone': new FormControl(null,Validators.required),
			'userName': new FormControl(null,Validators.required),
			'email':new FormControl(null,Validators.required),
			'password':new FormControl(null,Validators.required)
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
		if (modal)
			modal.click();
	}

	onSubmitSignup(){
		console.log( this.signupForm.value)
		this.inAuthService.userSignup(this.signupForm.value).subscribe(res =>{
			console.log(res)
		})
	}
}
