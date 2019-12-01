export class Promotion { 
	promotion_id:number;
	title:string;
	description:string;
	effective_date:number;
	expired_date:number;
	image:string;
	seen_flag:string;
	user_id:number;

   constructor(promotion_id:number,title:string,description:string,effective_date:number,expired_date:number,image:string,seen_flag:string,user_id:number) {
		this.promotion_id = promotion_id;
		this.title = title;
		this.description = description;
		this.effective_date = effective_date;
		this.expired_date = expired_date;
		this.image = image;
		this.seen_flag = seen_flag;
		this.user_id = user_id;

   }
}