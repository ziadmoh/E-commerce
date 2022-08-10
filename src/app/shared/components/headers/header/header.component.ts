import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UtilsService } from 'src/app/shared/services/utils.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
	selector: 'app-ecommerce-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

	@Input() containerClass = "container";

	

	isLoggedIn: boolean = false;

	isAdmin:boolean = false

	constructor(
		public activeRoute: ActivatedRoute, 
		public utilsService: UtilsService, 
		public modalService: ModalService,
		private authService:AuthService,
		private router:Router,) {
	}

	ngOnInit(): void {

		this.isLoggedIn = this.authService.isLoggedIn;
		this.authService.newUser.subscribe(user =>{
			if(user && user.type == 'admin'){
				this.isAdmin = true
			}
		})
	}

	showLoginModal(event: Event): void {
		event.preventDefault();
		this.modalService.showLoginModal();
	}

	logOut(){
		//this.authService.newUser.unsubscribe()
		this.authService.logout();
	}

	toAccount(){
		this.authService.newUser.subscribe(user =>{
			if(user && user.userId){
				this.router.navigate(['/shop/orders'])
			}else{
				this.modalService.showLoginModal();
			}
		})
	}
}
