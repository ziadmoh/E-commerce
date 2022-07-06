import { Component, OnInit } from '@angular/core';
import { AdminSharedService } from '../../admin-shared.service';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'admin-aside',
	templateUrl: './aside.component.html',
	styleUrls: ['./aside.component.scss']
})

export class AdminAsideComponent implements OnInit {
	
	appShortenName:string = environment.appName[0] + environment.appName[1]

	appName:string =  environment.appName;

	constructor(private adminshared:AdminSharedService) { }

	ngOnInit(): void {

    }

	isExpanded(){
		return this.adminshared.isAsideExpanded
	}
}
