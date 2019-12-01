export class Places { 
	place_id:number;
	country:string;
	city:string;
	address:string;
	user_id:number;

   constructor(place_id:number,country:string,city:string,address:string,user_id:number) {
		this.place_id = place_id;
		this.country = country;
		this.city = city;
		this.address = address;
		this.user_id = user_id;

   }
}