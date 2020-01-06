import {Size} from '../models/size';
import { Product } from '../models/product'
import { Thuoctinh } from '../models/thuoctinh'
import { Category } from '../models/category'
export class ProducScreenDtail { 
  product: Product = new Product();
  sizes: Size[];
  thuoctinh: Thuoctinh = new Thuoctinh();
  description: string = ''; 
  catName: string ='';
  cats: Category[];
}