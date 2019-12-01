export class Category { 
	cat_id:number;
	folder_id:number;
	cat_name:string;
	image:string;

   constructor(cat_id:number,folder_id:number,cat_name:string,image:string) {
		this.cat_id = cat_id;
		this.folder_id = folder_id;
		this.cat_name = cat_name;
		this.image = image;

   }
}