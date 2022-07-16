import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

	wishCount = 0;

	isLoggedIn: boolean = false;

	constructor(
		public activeRoute: ActivatedRoute, 
		public utilsService: UtilsService, 
		public modalService: ModalService,
		private authService:AuthService) {
	}

	ngOnInit(): void {

		this.isLoggedIn = this.authService.isLoggedIn;
	}

	showLoginModal(event: Event): void {
		event.preventDefault();
		this.modalService.showLoginModal();
	}

	logOut(){
		this.authService.logout();
	}
}
