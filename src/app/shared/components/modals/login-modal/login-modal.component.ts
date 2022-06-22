import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { FacebookLoginProvider } from "@abacritt/angularx-social-login";

@Component({
	selector: 'app-ecommerce-login-modal',
	templateUrl: './login-modal.component.html',
	styleUrls: ['./login-modal.component.scss']
})

export class LoginModalComponent implements OnInit {
	socialUser!: SocialUser;
  	isLoggedin?: boolean = undefined;

	constructor(private sAuthService: SocialAuthService) { }

	ngOnInit(): void {
		this.sAuthService.authState.subscribe((user) => {
			this.socialUser = user;
			this.isLoggedin = user != null;
		  });
	}

	signInWithFB(): void {
		this.sAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
	  }

	closeModal() {
		let modal = document.querySelector('.login-modal') as HTMLElement;
		if (modal)
			modal.click();
	}
}
