import Cookie from 'js-cookie';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Product } from 'src/app/shared/classes/product';

import { QuickViewComponent } from 'src/app/shared/components/modals/quick-view/quick-view.component';
import { QuickViewTwoComponent } from 'src/app/shared/components/modals/quick-view-two/quick-view-two.component';
import { LoginModalComponent } from '../components/modals/login-modal/login-modal.component';
import { VideoModalComponent } from '../components/modals/video-modal/video-modal.component';

import { environment } from 'src/environments/environment';
import { ChildDataModalComponent } from '../components/modals/child-data-modal/child-data-modal.component';
import { ProductModalComponent } from '../components/modals/product-modal/product-modal.component';

@Injectable({
	providedIn: 'root'
})

export class ModalService {
	products = [];
	timer: any;
	isLoginModalRequired:boolean = false;
	private modalOption1: NgbModalOptions = {
		centered: true,
		size: 'xl',
		windowClass: 'newsletter-modal',
		beforeDismiss: async () => {
			document.querySelector('body')?.classList.remove('modal-open');

			await new Promise((resolve) => {
				setTimeout(() => {
					resolve('success');
				}, 250)
			});

			(document.querySelector('.logo') as HTMLElement).focus({ preventScroll: true });

			return true;
		}
	};

	private modalOption2: NgbModalOptions = {
		centered: true,
		size: 'lg',
		windowClass: 'login-modal',
		beforeDismiss: async () => {
			document.querySelector('body')?.classList.remove('modal-open');

			await new Promise((resolve) => {
				setTimeout(() => {
					resolve('success');
				}, 300)
			});

			(document.querySelector('.logo') as HTMLElement).focus({ preventScroll: true });

			return true;
		}
	}

	private modalOption3: NgbModalOptions = {
		centered: true,
		size: 'xl',
		scrollable: false,
		windowClass: "vb-modal",
		beforeDismiss: async () => {
			document.querySelector('body')?.classList.remove('modal-open');

			await new Promise((resolve) => {
				setTimeout(() => {
					resolve('success');
				}, 300)
			});

			(document.querySelector('.logo') as HTMLElement).focus({ preventScroll: true });

			return true;
		}
	};

	private modalOption4: NgbModalOptions = {
		centered: true,
		size: 'xl',
		beforeDismiss: async () => {
			document.querySelector('body')?.classList.remove('modal-open');

			await new Promise((resolve) => {
				setTimeout(() => {
					resolve('success');
				}, 300)
			});


			(document.querySelector('.logo') as HTMLElement).focus({ preventScroll: true });

			return true;
		}
	};

	private childDatamodalOption: NgbModalOptions = {
		centered: true,
		size: 'xl',
		windowClass: 'child-data-modal',
		beforeDismiss: async () => {
			document.querySelector('body')?.classList.remove('modal-open');

			await new Promise((resolve) => {
				setTimeout(() => {
					resolve('success');
				}, 300)
			});

			(document.querySelector('.logo') as HTMLElement).focus({ preventScroll: true });

			return true;
		}
	}

	private ProductModalOption: NgbModalOptions = {
		centered: true,
		size: 'xl',
		windowClass: 'product-modal',
		beforeDismiss: async () => {
			document.querySelector('body')?.classList.remove('modal-open');

			await new Promise((resolve) => {
				setTimeout(() => {
					resolve('success');
				}, 300)
			});

			(document.querySelector('.logo') as HTMLElement).focus({ preventScroll: true });

			return true;
		}
	}

	constructor(private modalService: NgbModal, private router: Router, private http: HttpClient) {
	}


	// Show login modal
	showLoginModal() {
		(document.querySelector('.logo') as HTMLElement).focus({ preventScroll: true });
		this.modalService.open(
			LoginModalComponent,
			this.modalOption2
		)
	}

	// Show Order Items modal
	showChildDataModal() {
		(document.querySelector('.logo') as HTMLElement).focus({ preventScroll: true });
		this.modalService.open(
			ChildDataModalComponent,
			this.childDatamodalOption
		)
	}
	// Show Product modal
	showProductModal() {
		(document.querySelector('.logo') as HTMLElement).focus({ preventScroll: true });
		this.modalService.open(
			ProductModalComponent,
			this.ProductModalOption
		)
	}


	// Show Video modal
	showVideoModal() {
		this.modalService.open(
			VideoModalComponent,
			this.modalOption3
		)
	}

	/**
	 * Show Product in QuickView
	 */
	public showQuickView(product: Product) {
		(document.querySelector('.logo') as HTMLElement).focus({ preventScroll: true });

		const modalRef = this.modalService.open(
			QuickViewComponent,
			{
				...this.modalOption4,
				windowClass: 'quickView-modal'
			}
		);

		modalRef.componentInstance.product = product;
	}

	/**
	 * Show Product in QuickViewTwo
	 */
	public showQuickViewTwo(product: Product) {
		(document.querySelector('.logo') as HTMLElement).focus({ preventScroll: true });

		const modalRef = this.modalService.open(
			QuickViewTwoComponent,
			{
				...this.modalOption4,
				windowClass: 'quickView-modal'
			}
		);

		modalRef.componentInstance.product = product;
	}


	closeLoginModal(modal:HTMLElement){
		modal.click();
	}

	closeChildDataModal(modal:HTMLElement){
		modal.click();
	}

	closeProductModal(modal:HTMLElement){
		modal.click();
	}
}