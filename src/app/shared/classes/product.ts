export interface Product {
	productId?: number;
	productName?: string;
	productPrice?: number;
	productImage?:string;
	productImages?:{
		imageId:number,
		image:string,
		product_id:number
	}[]
	productColor:string;
	productDescription:string;
	box:string;
	productRate:number;
	productOldPrice:number;


	id?: number;
	name?: string;
	slug?: string;
	price?: number;
	sale_price?: number;
	review?: number;
	ratings?: number;
	until?: string;
	stock?: number;
	top?: boolean;
	featured?: boolean;
	new?: boolean;
	short_desc?: boolean;
	category?: Array<{
		name?: string;
		slug?: string;
	}>;
	pictures?: Array<{
		width?: number;
		height?: number;
		url: number;
	}>;
	sm_pictures?: Array<{
		width?: number;
		height?: number;
		url?: number;
	}>
	variants?: Array<{
		color?: string;
		color_name?: string;
		price?: number;
		size?: Array<{
			name?: string;
		}>
	}>
}