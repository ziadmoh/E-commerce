import { Component, OnInit } from '@angular/core';


@Component({
	selector: 'admin-home',
	templateUrl: './admin-home.component.html',
	styleUrls: ['./admin-home.component.scss']
})

export class AdminHomeComponent implements OnInit {
	
	orders:{}[] = []

	constructor() { }
	ngOnInit(){
		this.orders = [
			{id:'1',userName:'Kareem',phone:'01110695150',productName:'product 1365',quantity:20,totalPrice:400,status:'delivered',orderDate:'23-03-2022'},
			{id:'2',userName:'Ziad',phone:'01110695150',productName:'tickets 140',quantity:20,totalPrice:130,status:'pending',orderDate:'15-06-2022'},
			{id:'3',userName:'Mahmoud',phone:'01110695150',productName:'box 120',quantity:20,totalPrice:36,status:'new',orderDate:'09-09-2021'},
			{id:'4',userName:'Gemy',phone:'01110695150',productName:'product 1365',quantity:20,totalPrice:340,status:'cancelled',orderDate:'16-07-2022'},
		]
	 }

	
}
