export class Image { 
	product_id:number;
	url:string;
	type:string;

   constructor(product_id:number,url:string,type:string) {
		this.product_id = product_id;
		this.url = url;
		this.type = type;

   }
}