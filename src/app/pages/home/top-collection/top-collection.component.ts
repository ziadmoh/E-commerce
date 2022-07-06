import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-ecommerce-top-collection',
	templateUrl: './top-collection.component.html',
	styleUrls: ['./top-collection.component.scss']
})

export class TopCollectionComponent implements OnInit {

	@Input() products = [];
	@Input() loaded = false;

	categories = [['all'], ['boxes'], ['singly']];
	titles = { "all": "All", "boxes": "Boxes", "singly": "Singly" };

	constructor() { }

	ngOnInit(): void {
	}
}
