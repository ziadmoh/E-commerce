import { Component, OnInit } from '@angular/core';
import { AdminSharedService } from '../../admin-shared.service';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
	selector: 'admin-nav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.scss']
})

export class AdminNavComponent implements OnInit {


	constructor(private adminshared:AdminSharedService,private authService:AuthService) { }

	ngOnInit(): void {
     }
	
	toggleAside(){
		this.adminshared.isAsideExpanded = !this.adminshared.isAsideExpanded
	}

	logOut(){
		this.authService.logout();
	}

}
