import { Component, OnInit } from '@angular/core';
import { Payment } from '../../shared/models/payment';
import { Settingshop } from '../../shared/models/settingshop';
import { Size } from '../../shared/models/size';
import { Cart } from '../../shared/models/cart';
import { PaymentScreen } from '../../shared/screenvars/PaymentScreen';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { PaymentService } from '../../shared/services/payment.service';
import { UserService } from '../../shared/services/user.service';
import { ProductService } from '../../shared/services/product.service';
@Component( {
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.css'],
    providers: [PaymentService, UserService, ProductService]
})
export class DetailComponent implements OnInit {
    paymentscreen: PaymentScreen = new PaymentScreen();
    payment: Payment = new Payment();
    isAdmin: boolean = false;
    carts: Array<Cart> = new Array();
    newCarts: Array<Cart> = new Array();
    settingShop: Settingshop = new Settingshop();
    voucherMess: string = '';
    id: string = '';
typeSelected: string = '';
shipSelected: string = '';
    constructor( private activatedRoute: ActivatedRoute, private router: Router, private paymentService: PaymentService
        , private cookieService: CookieService, private userService: UserService, private productService: ProductService ) { }

    ngOnInit() {
        if ( this.cookieService.check( 'token' ) ) {
            this.id = this.activatedRoute.snapshot.paramMap.get( 'id' );
            this.paymentService.getPaymentDetail( this.cookieService.get( 'token' ), this.id ).subscribe(( data: {}) => {
                for ( const [key, value] of Object.entries( data ) ) {
                    if ( key == 'payment' ) {
                        this.payment = data[key];
                        this.typeSelected = this.payment.pay_type;
                        this.shipSelected = this.payment.ship;
                    } else if ( key == 'carts' ) {
                        this.carts = data[key];
                    } else {
                        this.settingShop = data[key];
                    }
                }
                this.userService.isAdmin( this.cookieService.get( 'token' ) ).subscribe( res => {
                    if ( res == true ) {
                        this.isAdmin = true;
                    }
                });
                console.log( data );
            });
        } else {
            this.router.navigate( [''] );
        }
    }
    selectType( value ) {
        this.typeSelected = value;
        this.payment.pay_type = value;
    }
    selectShip( value ) {
        this.shipSelected = value;
        this.payment.ship = value;
    }
    addProduct() {
        this.newCarts.push( new Cart() )
    }
    getProductByCode( value, i ) {
        this.productService.getProductByCode( value.value, this.cookieService.get( 'token' ) ).subscribe(( res: any) => {
            this.newCarts[i] = res;
            this.applyVoucher();
        });
    }
    calculateTotal() {
        if ( this.payment.total >= this.settingShop.freeShip ) {
            this.payment.shipfee = 0;
        } else {
            if ( this.payment.tinhthanh == 'HCM' ) {
                if ( this.settingShop.ngoaithanh.includes( this.payment.quanhuyen + ',' ) ) {
                    this.payment.shipfee = this.settingShop.giangoaithanh;
                } else {
                    this.payment.shipfee = this.settingShop.gianoithanh;
                }

            } else {
                if ( this.payment.hinhthuc == 'thuho' ) {
                    this.payment.shipfee = this.settingShop.thuho;
                } else {
                    this.payment.shipfee = this.settingShop.chanhxe;
                }
            }
        }
    }
    changeAmount() {
        var total = 0;
        this.carts.map( function( cart ) {
            if ( cart.disct_price != 0 && cart.price >= cart.disct_price ) {
                total += cart.disct_price * cart.amount;
            } else {
                total += cart.price * cart.amount;
            }
        });
        this.newCarts.map( function( cart ) {
            if ( cart.disct_price != 0 && cart.price >= cart.disct_price ) {
                total += cart.disct_price * cart.amount;
            } else {
                total += cart.price * cart.amount;
            }
        });
        if ( total < this.settingShop.freeShip ) {
            this.payment.shipfee = this.settingShop.defaultShip;
        } else {
            this.payment.shipfee = 0;
        }
        this.payment.total = total + this.payment.shipfee;
        this.payment.sum = total;
        if ( this.voucherMess != '' ) {
            if ( this.voucherMess.split( '###' ).length > 1 ) {
                var discount = Number( this.voucherMess.split( '###' )[1] );
                if ( discount > 100 ) {
                    this.payment.total = this.payment.total - discount;
                } else {
                    this.payment.total = this.payment.total * discount / 100;
                }
            }
        }
    }
    
    applyVoucher() {
        this.voucherMess = '';
        this.changeAmount();
        if ( this.payment.voucher != '' ) {
            this.paymentService.checkVoucher( this.payment.voucher, this.payment.sum ).subscribe(( res: {}) => {
                var message = '';
                for ( const [key, value] of Object.entries( res ) ) {
                    if ( key == 'message' ) {
                        var message = value as string;
                    }
                }
                if ( message.split( '###' ).length > 1 ) {
                    var discount = Number( message.split( '###' )[1] );
                    if ( discount > 100 ) {
                        this.payment.total = this.payment.total - discount;
                    } else {
                        this.payment.total = this.payment.total * discount / 100;
                    }
                }else {
                    this.payment.voucher = ''
                }

                this.voucherMess = message;
            });
        } 

    }
    update() {
        this.paymentService.updatePayment(this.cookieService.get('token'), this.payment, this.carts).subscribe(( res: any) => {
            alert('Cập nhật đơn hàng thành công.');
            window.location.reload();
        });
    }
}
