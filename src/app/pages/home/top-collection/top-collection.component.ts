import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-ecommerce-top-collection',
	templateUrl: './top-collection.component.html',
	styleUrls: ['./top-collection.component.scss']
})

export class TopCollectionComponent implements OnInit {

	@Input() products = [];
	@Input() loaded = false;

	categories = [['all'], ['boxes'], ['other products']];
	titles = { "all": "All", "boxes": "Boxes", "other products": "Other products" };

	constructor() { }

	ngOnInit(): void {
	}
}
