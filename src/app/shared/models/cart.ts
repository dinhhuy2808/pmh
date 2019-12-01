export class Cart { 
	user_id:number;
	product_id:number;
	amount:number;
	payment_id:number;
	create_time:number;
	disct_price:number =0;
	price:number=0;
	status_id:number;
	name:string;
	size:string;
	code:string;
	pos:string;

   constructor(user_id:number,product_id:number,amount:number,payment_id:number,create_time:number,disct_price:number,price:number,status_id:number,name:string,size:string,code:string,pos:string) {
		this.user_id = user_id;
		this.product_id = product_id;
		this.amount = amount;
		this.payment_id = payment_id;
		this.create_time = create_time;
		this.disct_price = disct_price;
		this.price = price;
		this.status_id = status_id;
		this.name = name;
		this.size = size;
		this.code = code;
		this.pos = pos;

   }
}