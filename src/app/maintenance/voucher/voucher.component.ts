import { Component, OnInit } from '@angular/core';
import { Voucher } from '../../shared/models/voucher';
import { VoucherService } from '../../shared/services/voucher.service'
import { CookieService } from 'ngx-cookie-service';
@Component( {
    selector: 'app-voucher',
    templateUrl: './voucher.component.html',
    styleUrls: ['./voucher.component.css'],
    providers: [VoucherService]
})
export class VoucherComponent implements OnInit {
    vouchers: Array<Voucher> = new Array();
    newVouchers: Array<Voucher> = new Array();

    constructor( private voucherService: VoucherService, private cookieService: CookieService ) { }

    ngOnInit() {
        this.vouchers.push( new Voucher() )
        this.voucherService.getVouchers( this.cookieService.get( 'token' ) ).subscribe(( data: Array<Voucher> ) => {
            this.vouchers = data;
            this.vouchers.map( function( item ) {
                var date = item.expired_date.toString();
                var year = date.substring( 0, 4 )
                var month = date.substring( 4, 6 )
                var day = date.substring( 6, 8 )
                item.expired_date = year + '-' + month + '-' + day;

                date = item.effective_date.toString();
                var year = date.substring( 0, 4 )
                var month = date.substring( 4, 6 )
                var day = date.substring( 6, 8 )
                item.effective_date = year + '-' + month + '-' + day;
            })
        });
    }
    add() {
        this.newVouchers.push( new Voucher() )
    }
    checkCode( value ) {
        this.voucherService.checkVouchers( this.cookieService.get( 'token' ), value ).subscribe(( data: {}) => {
            if ( data == '200' ) {
                return true;
            } else {
                return false;
            }
        });
    }
    insertVoucher() {
        this.newVouchers.map( function( item ) {
            item.expired_date = item.expired_date.replace( /-/g, '' );
            item.effective_date = item.effective_date.replace( /-/g, '' )
        })
        this.voucherService.createVouchers( this.cookieService.get( 'token' ), this.newVouchers ).subscribe(( data: {}) => {
            if ( data == '200' ) {
                this.newVouchers = new Array();
                this.voucherService.getVouchers( this.cookieService.get( 'token' ) ).subscribe(( data: Array<Voucher> ) => {
                    this.vouchers = data;
                    this.vouchers.map( function( item ) {
                        var date = item.expired_date.toString();
                        var year = date.substring( 0, 4 )
                        var month = date.substring( 4, 6 )
                        var day = date.substring( 6, 8 )
                        item.expired_date = year + '-' + month + '-' + day;

                        date = item.effective_date.toString();
                        var year = date.substring( 0, 4 )
                        var month = date.substring( 4, 6 )
                        var day = date.substring( 6, 8 )
                        item.effective_date = year + '-' + month + '-' + day;
                    })
                });
            }
        });
    }
    delete( id ) {
        this.voucherService.deleteVouchers( this.cookieService.get( 'token' ), id ).subscribe(( data: {}) => {
            if ( data == '200' ) {
                this.newVouchers = new Array();
                this.voucherService.getVouchers( this.cookieService.get( 'token' ) ).subscribe(( data: Array<Voucher> ) => {
                    this.vouchers = data;
                    this.vouchers.map( function( item ) {
                        var date = item.expired_date.toString();
                        var year = date.substring( 0, 4 )
                        var month = date.substring( 4, 6 )
                        var day = date.substring( 6, 8 )
                        item.expired_date = year + '-' + month + '-' + day;

                        date = item.effective_date.toString();
                        var year = date.substring( 0, 4 )
                        var month = date.substring( 4, 6 )
                        var day = date.substring( 6, 8 )
                        item.effective_date = year + '-' + month + '-' + day;
                    })
                });
            }
        });
    }

    update( index ) {
        var voucher = this.vouchers.map( function( item ) {
           if (item.voucher_id == index) {
               item.expired_date = item.expired_date.replace( /-/g, '' );
               item.effective_date = item.effective_date.replace( /-/g, '' )
               return item;
           }
        });
      this.voucherService.updateVouchers( this.cookieService.get( 'token' ), voucher[0] ).subscribe(( data: {}) => {
    if ( data == '200' ) {
        this.newVouchers = new Array();
        this.voucherService.getVouchers( this.cookieService.get( 'token' ) ).subscribe(( data: Array<Voucher> ) => {
            this.vouchers = data;
            this.vouchers.map( function( item ) {
                var date = item.expired_date.toString();
                var year = date.substring( 0, 4 )
                var month = date.substring( 4, 6 )
                var day = date.substring( 6, 8 )
                item.expired_date = year + '-' + month + '-' + day;

                date = item.effective_date.toString();
                var year = date.substring( 0, 4 )
                var month = date.substring( 4, 6 )
                var day = date.substring( 6, 8 )
                item.effective_date = year + '-' + month + '-' + day;
            })
        });
    }
});
  }
}
