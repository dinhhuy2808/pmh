import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Person } from '../models/person'
import { Product } from '../models/product'
import { Size } from '../models/size'
import { Cart } from '../models/cart'
import { PaymentScreen } from '../screenvars/PaymentScreen'
import { Thuoctinh } from '../models/thuoctinh'
import { Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { HttpHeaders, HttpParams } from '@angular/common/http';



@Injectable()
export class PaymentService {

    private getPaymentUrl = 'http://localhost:8080/app/payment';

    constructor( private http: HttpClient ) { }

    checkoutLogin( token: string ) {
        return this.http.get( this.getPaymentUrl + '/checkout/' + token ).pipe(
            map( this.extractData ) );
    }
    checkoutNotLogin( cartInfo: string ) {
        const httpOptions = {
            headers: new HttpHeaders(
                { 'Content-Type': 'application/json' }

            )
        };
        return this.http.post( this.getPaymentUrl + '/checkout-not-login/', cartInfo, httpOptions ).pipe(
            map( this.extractData ) );
    }
    checkVoucher( voucher: string, sum: number ) {
        return this.http.get( this.getPaymentUrl + '/check/voucher/' + voucher + '/' + sum );
    }
    createPayment( paymentScreen: PaymentScreen, token: string, isLogIn: string ) {
        const httpOptions = {
            headers: new HttpHeaders( { 'Content-Type': 'application/json' })
        };
        let data = {
            PaymentScreen: paymentScreen
        }
        return this.http.post( this.getPaymentUrl + '/' + token + "/" + isLogIn, paymentScreen, httpOptions ).pipe(
            map( this.extractData )
        )
    }
    getPaymentDetail( token: string, id: string ) {
        return this.http.get( this.getPaymentUrl + '/get-payment-detail/' + token + "/" + id ).pipe(
            map( this.extractData ) );
    }
    getPayments( token: string ) {
        return this.http.get( this.getPaymentUrl + '/get-payments/' + token ).pipe(
            map( this.extractData ) );
    }
    updatePayment( token: string, payment: Payment, carts: Array<Cart> ) {
        const httpOptions = {
            headers: new HttpHeaders(
                { 'Content-Type': 'application/json' }

            )
        };
        let data = {
            payment: payment,
            cart: carts
        }
        return this.http.put( this.getPaymentUrl + '/update-payment/' + token, data, httpOptions ).pipe(
            map( this.extractData ) );
    }
    private extractData( res: Response ) {
        let body = res;
        return body || {};
    }
    private handleErrorObservable( error: Response | any ) {
        console.error( error.message || error );
        return Observable.throw( error.message || error );
    }
}
