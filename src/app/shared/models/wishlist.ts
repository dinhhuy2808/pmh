export class Wishlist { 
	user_id:number;
	product_id:number;
	amount:number;
	create_time:number;
	disct_price:number;
	price:number;
	status_id:number;

   constructor(user_id:number,product_id:number,amount:number,create_time:number,disct_price:number,price:number,status_id:number) {
		this.user_id = user_id;
		this.product_id = product_id;
		this.amount = amount;
		this.create_time = create_time;
		this.disct_price = disct_price;
		this.price = price;
		this.status_id = status_id;

   }
}