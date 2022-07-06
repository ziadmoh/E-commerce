import { Component, OnInit,ViewEncapsulation  } from '@angular/core';


@Component({
	selector: 'admin-init',
	templateUrl: './admin-initial.component.html',
	styleUrls: ['./admin-initial.component.scss'],
	encapsulation:ViewEncapsulation.None
	
})

export class AdminInitComponent implements OnInit {

	constructor() { }

	ngOnInit(): void { }
}
