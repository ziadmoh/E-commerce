import { Component, OnInit,ViewEncapsulation  } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ModalService } from 'src/app/shared/services/modal.service';


@Component({
	selector: 'admin-init',
	templateUrl: './admin-initial.component.html',
	styleUrls: ['./admin-initial.component.scss'],
	encapsulation:ViewEncapsulation.None
	
})

export class AdminInitComponent implements OnInit {

	constructor(public modalService: ModalService,private authService:AuthService) { }

	ngOnInit(): void { 
		this.authService.autoLogin()
	}



}
