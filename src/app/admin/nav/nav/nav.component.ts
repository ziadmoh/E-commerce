import { Component, OnInit } from '@angular/core';
import { AdminSharedService } from '../../admin-shared.service';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'admin-nav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.scss']
})

export class AdminNavComponent implements OnInit {


	constructor(private adminshared:AdminSharedService) { }

	ngOnInit(): void {
     }
	
	toggleAside(){
		this.adminshared.isAsideExpanded = !this.adminshared.isAsideExpanded
	}

}
