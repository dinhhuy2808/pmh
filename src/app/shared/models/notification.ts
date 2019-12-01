export class Notification { 
	notification_id:number;
	title:string;
	description:string;
	create_time:number;
	image:string;
	user_id:number;
	seen_flag:string;

   constructor(notification_id:number,title:string,description:string,create_time:number,image:string,user_id:number,seen_flag:string) {
		this.notification_id = notification_id;
		this.title = title;
		this.description = description;
		this.create_time = create_time;
		this.image = image;
		this.user_id = user_id;
		this.seen_flag = seen_flag;

   }
}