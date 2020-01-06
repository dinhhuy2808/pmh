import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Person } from '../models/person'
import { Product } from '../models/product'
import { Size } from '../models/size'
import { CategoryScreen } from '../screenvars/CategoryScreen'
import { ProducScreen } from '../screenvars/ProducScreen'

import { Thuoctinh } from '../models/thuoctinh'
import { Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Index } from '../index';


@Injectable()
export class ProductService {
    index:Index = new Index();
    private getProductUrl = 'http://'+this.index.host+':8080/app/product';

    constructor(private http: HttpClient) { }

    getProduct(productName: string, purpose:string) {
        return this.http.get(this.getProductUrl + '/' + productName+"/"+purpose);
    }
    getProductByCategoryName(catName: string, page:string) {
        return this.http.get<CategoryScreen[]>(this.getProductUrl + '/get-by-category/' + catName+"/"+page);
    }
    getLatestProduct() {
        return this.http.get<CategoryScreen[]>(this.getProductUrl + '/get-list-hot-product/');
    }
    getAllProduct(token:string) {
        return this.http.get<ProducScreen[]>(this.getProductUrl + '/get-all-product/'+token);
    }
    search(keyword: string, page:string) {
        return this.http.get<CategoryScreen[]>(this.getProductUrl + '/search/' + keyword+"/"+page);
    }
    deleteProduct(token: string, productName:string) {
        return this.http.get<CategoryScreen[]>(this.getProductUrl + '/delete-product/' + token+"/"+productName);
    }
    checkProductName(productName: string) {
        return this.http.get(this.getProductUrl + '/check/' + productName).pipe(
            map(this.extractData));
    }

    checkCodeOfSize(sizeCode: string) {
        return this.http.get(this.getProductUrl + '/check/size/' + sizeCode).pipe(
            map(this.extractData));
    }
    addProduct(product: Product, size: Size[], thuoctinh: Thuoctinh, file:FileList, catName:string) {
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})};
        let data = {
            product: product,
            size: size,
            thuoctinh: thuoctinh,
            images:file
        }
        return this.http.put(this.getProductUrl + '/'+catName, data, httpOptions).pipe(
            map(this.extractData)
            )
    }
    addProductDV(product: Product, thuoctinh: Thuoctinh, catName:string) {
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})};
        let data = {
            product: product,
            thuoctinh: thuoctinh,
        }
        return this.http.put(this.getProductUrl + '/DV/'+catName, data, httpOptions).pipe(
            map(this.extractData)
            )
    }
    editProduct(product: Product, size: Array<Size>, thuoctinh: Thuoctinh, file:FileList, catName:string,token:string) {
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})};
        let data = {
            product: product,
            size: size,
            thuoctinh: thuoctinh,
            images:file
        }
        return this.http.put(this.getProductUrl + '/edit/'+token, data, httpOptions).pipe(
            map(this.extractData)
            )
    }
    addToCart(productId:string, quantity: string, selectedSize: string, token: string){
        return this.http.get(this.getProductUrl + '/add-cart/'+productId+'/'+selectedSize+'/'+quantity+'/'+token).pipe(
                map(this.extractData));
    }
    getCartAmount(token:string){
        const httpOptions = {
                headers: new HttpHeaders(
                        {'Content-Type': 'application/json','Authorization':token}
                        
                )};
        return this.http.get(this.getProductUrl + '/get-cart/'+token,httpOptions).pipe(
                map(this.extractData));
    }
    
    getCartDetail(token: string) {
        const httpOptions = {
                headers: new HttpHeaders(
                        {'Content-Type': 'application/json'}
                        
                )};
        return this.http.get(this.getProductUrl + '/get-cart-detail/'+token,httpOptions).pipe(
                map(this.extractData));
    }
    getProductByCode(code:string, token:string) {
        return this.http.get(this.getProductUrl + '/getProductByCode/'+code+'/'+token).pipe(
                map(this.extractData));
    }
    getCartNotLogin(cartInfo: string) {
        const httpOptions = {
                headers: new HttpHeaders(
                        {'Content-Type': 'application/json'}
                        
                )};
        return this.http.put(this.getProductUrl + '/get-cart-detail-not-login',cartInfo,httpOptions).pipe(
                map(this.extractData));
    }
   
    private extractData(res: Response) {
        let body = res;
        return body || {};
    }
    private handleErrorObservable(error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.message || error);
    }
}
