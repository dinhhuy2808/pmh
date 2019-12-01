export class Discount { 
	product_id:number;
	effective_date:number;
	expired_date:number;
	disct_price:number;

   constructor(product_id:number,effective_date:number,expired_date:number,disct_price:number) {
		this.product_id = product_id;
		this.effective_date = effective_date;
		this.expired_date = expired_date;
		this.disct_price = disct_price;

   }
}