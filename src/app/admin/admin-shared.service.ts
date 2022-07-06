import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})

export class AdminSharedService {

    isAsideExpanded:boolean = false;

	appShortenName:string =  environment.appName[0] + environment.appName[1];

	appName:string =  environment.appName;

	constructor() {
	}



} 