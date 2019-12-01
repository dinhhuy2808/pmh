import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { Voucher } from '../models/voucher'
import { Settingshop } from '../models/settingshop'
import { Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class VoucherService {

    private getVoucherUrl = 'http://localhost:8080/app/voucher';

    constructor( private http: HttpClient ) { }

    /** GET persons from the server */

    getVouchers(token:string) {
        const httpOptions = {
                headers: new HttpHeaders(
                        {'Content-Type': 'application/json','Authorization':token}
                        
                )};
        return this.http.get( this.getVoucherUrl+'/'+token, httpOptions ).pipe(
            map(this.extractData));
    }
    checkVouchers(token:string,code:string) {
        const httpOptions = {
                headers: new HttpHeaders(
                        {'Content-Type': 'application/json','Authorization':token}
                        
                )};
        return this.http.get( this.getVoucherUrl+'/check/'+code+'/'+token, httpOptions ).pipe(
            map(this.extractData));
    }
    createVouchers(token:string, newVouchers: Array<Voucher>) {
        const httpOptions = {
                headers: new HttpHeaders(
                        {'Content-Type': 'application/json','Authorization':token}
                        
                )};
        return this.http.post( this.getVoucherUrl+'/'+token ,newVouchers,httpOptions).pipe(
            map(this.extractData));
    }
    
    updateVouchers(token:string, oldVouchers: Voucher) {
        const httpOptions = {
                headers: new HttpHeaders(
                        {'Content-Type': 'application/json','Authorization':token}
                        
                )};
        return this.http.put( this.getVoucherUrl+'/'+token ,oldVouchers,httpOptions).pipe(
            map(this.extractData));
    }

    deleteVouchers(token:string, id:string) {
        const httpOptions = {
                headers: new HttpHeaders(
                        {'Content-Type': 'application/json','Authorization':token}
                        
                )};
        return this.http.post( this.getVoucherUrl+'/delete/'+id+'/'+token ,httpOptions).pipe(
            map(this.extractData));
    }
    
    private extractData( res: Response ) {
        let body = res;
        return  body || { };
    }
    private handleErrorObservable( error: Response | any ) {
        console.error( error.message || error );
        return Observable.throw( error.message || error );
    }
}
