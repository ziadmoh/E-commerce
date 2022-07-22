import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';

import { Product } from 'src/app/shared/classes/product';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'product-gallery-default',
	templateUrl: './gallery-default.component.html',
	styleUrls: ['./gallery-default.component.scss']
})

export class GalleryDefaultComponent implements OnInit {

	@Input() product: Product;
	@Input() adClass = 'product-gallery-vertical';

	paddingTop = '100%';
	currentIndex = 0;
	album = [];
	lightBoxOption = {
		showImageNumberLabel: true,
		centerVertically: true,
		showZoom: true,
		fadeDuration: .2,
		albumLabel: "%1 / %2"
	}

	SERVER_URL = environment.SERVER_URL;

	constructor(public lightBox: Lightbox) { }

	@HostListener('window:resize', ['$event'])
	closeLightBox(event: Event) {
		this.lightBox.close();
	}

	ngOnChanges() {
		this.album = [];

		for (let i = 0; i < this.product.productImages.length; i++) {
			this.album.push({
				src:  this.product.productImages[i].image,
				thumb: this.product.productImages[i].image,
				caption: this.product.productName
			});
		}
	}

	getImageSizes(url){
		let img = new Image();
		img.onload = function() {
			this.paddingTop = Math.floor((parseFloat(img.height.toString()) / parseFloat(img.width.toString()) * 1000)) / 10 + '%';

		}.bind(this);
		img.src = url;
	}

	ngOnInit(): void {
		this.getImageSizes(this.product.productImage)
	}

	changeImage($event: Event, index = 0) {
		this.currentIndex = index;
		$event.preventDefault();
	}

	openLightBox() {
		this.lightBox.open(this.album, this.currentIndex, this.lightBoxOption);
	}
}