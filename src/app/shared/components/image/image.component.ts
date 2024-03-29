import { Component, OnInit, Input, ElementRef, Renderer2 } from '@angular/core';

@Component({
	selector: 'app-ecommerce-image',
	templateUrl: './image.component.html',
	styleUrls: ['./image.component.scss']
})

export class ImageComponent implements OnInit {

	@Input() src: string;
	@Input() width: string | number;
	@Input() height: string | number;
	@Input() fixedPt: string | number;
	@Input() minHeight: string;
	@Input() alt = 'banner';
	@Input() backgroundColor: string;

	defaultImage = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

	constructor(private el: ElementRef, private renderer: Renderer2) { }

	ngOnInit(): void {
		this.getImageSizes(this.src)
	}

	getImageSizes(url){
		let img = new Image();
		img.onload = function() {
			this.width = img.width
			this.height = img.height
		}.bind(this);
		img.src = url;
	}

	handler(event: any) {
		switch (event.reason) {
			case 'setup':
				let value: string | number = '100%';

				if (this.fixedPt) {
					value = this.fixedPt;
				} else if (this.height && this.width) {
					value = Math.floor((parseFloat(this.height.toString()) / parseFloat(this.width.toString()) * 1000)) / 10 + '%';
				} else {
					value = '100%';
				}

				this.renderer.setStyle(this.el.nativeElement, 'padding-top', value);

				if (this.minHeight) {
					this.renderer.setStyle(this.el.nativeElement, 'min-height', this.minHeight + 'rem');
				}

				if (this.backgroundColor) {
					this.renderer.setStyle(this.el.nativeElement, 'background-color', this.backgroundColor);
				}
				break;
			case 'observer-emit':
				break;
			case 'loading-succeeded':
				if (this.minHeight) {
					this.renderer.setStyle(this.el.nativeElement.querySelector('img'), 'min-height', this.minHeight + 'rem');
				}
				break;
			default:
				break
		}
	}
}
