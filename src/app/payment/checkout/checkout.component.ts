import { Component, OnInit } from '@angular/core';
import { Payment } from '../../shared/models/payment';
import { Size } from '../../shared/models/size';
import { PaymentScreen } from '../../shared/screenvars/PaymentScreen';
import { PaymentService } from '../../shared/services/payment.service';
import { UserService } from '../../shared/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from '../../modal/modal.component';
@Component( {
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css'],
    providers: [PaymentService, UserService]
})
export class CheckoutComponent implements OnInit {
    payment: PaymentScreen = new PaymentScreen();
    isAdmin: boolean = true;
    sizes: Size[] = [new Size(), new Size(), new Size()];
    typeSelected: string = '';
    shipSelected: string = '';
    voucherMess: string = '';
    constructor( private activatedRoute: ActivatedRoute, private router: Router,
        private paymentService: PaymentService, private cookieService: CookieService
        , private matDialog: MatDialog, private userService: UserService ) { }

    ngOnInit() {
        if ( this.cookieService.check( 'token' ) ) {
            this.paymentService.checkoutLogin( this.cookieService.get( 'token' ) ).subscribe( res => {
                this.payment = <PaymentScreen>res;
                this.payment.tinhthanh = 'HCM';
            });
        } else {
            this.paymentService.checkoutNotLogin( this.cookieService.get( 'cart' ) ).subscribe( res => {
                this.payment = <PaymentScreen>res;
                this.payment.tinhthanh = 'HCM';
            });
        }


    }
    createPayment() {
        if ( this.shipSelected == '' ) {
            alert( 'Xin chọn phương thức vận chuyển.' );
        } else if ( this.typeSelected == '' ) {
            alert( 'Xin chọn phương thức thanh toán.' )
        }else if ( this.payment.phone == '' ) {
            alert( 'Xin nhập số điện thoại.' )
        }else if ( this.payment.address == '' ) {
            alert( 'Xin địa chỉ.' )
        }else if ( this.payment.tinhthanh == '' ) {
            alert( 'Xin chọn tỉnh thành.' )
        } else if ( this.payment.tinhthanh == 'HCM' && this.payment.quanhuyen == '' ) {
            alert( 'Xin chọn Quận Huyện.' )
        } else {
            if ( this.cookieService.check( 'token' ) ) {
                this.payment.ship = this.shipSelected;
                this.payment.type = this.typeSelected;
                this.paymentService.createPayment( this.payment, this.cookieService.get( 'token' ),'true' ).subscribe( res => {
                    this.router.navigate( [''] );
                });

            } else {
                this.userService.checkUserByPhoneForPayment( this.payment.phone ).subscribe( res => {
                    if ( res == true ) {
                        const dialogConfig = new MatDialogConfig();
                        dialogConfig.data = {
                            name: 'RequestLogIn',
                            phone: this.payment.phone,
                            address: this.payment.address
                        }
                        const dialogRef = this.matDialog.open( ModalComponent, dialogConfig );
                        dialogRef.afterClosed().subscribe( result => {
                            console.log( result )
                            if ( result.message == 'ok' ) {
                                this.payment.ship = this.shipSelected;
                                this.payment.type = this.typeSelected;
                                this.paymentService.createPayment( this.payment, this.cookieService.get( 'token' ),'false' ).subscribe( res => {
                                    this.router.navigate( [''] );
                                });
                            }
                        });
                    } else {

                        const dialogConfig = new MatDialogConfig();
                        dialogConfig.data = {
                            name: 'RequestSignUp',
                            phone: this.payment.phone,
                            address: this.payment.address
                        }
                        const dialogRef = this.matDialog.open( ModalComponent, dialogConfig );
                        dialogRef.afterClosed().subscribe( result => {
                            console.log( result )
                            this.payment.userId = result.id;
                            this.payment.ship = this.shipSelected;
                            this.payment.type = this.typeSelected;
                            if (result.message == 'ok') {
                                this.paymentService.createPayment( this.payment, 'null','false' ).subscribe( res => {
                                    this.router.navigate( [''] );
                                });
                            } else {
                                this.paymentService.createPayment( this.payment, 'null','false' ).subscribe( res => {
                                    this.router.navigate( [''] );
                                });
                            }
                            
                        });
                    }
                });


            }
        }

    }
    calculateTotal() {
        if ( this.payment.total >= this.payment.settingShop.freeShip ) {
            this.payment.shipfee = 0;
        } else {
            if ( this.payment.tinhthanh == 'HCM' ) {
                if ( this.payment.settingShop.ngoaithanh.includes( this.payment.quanhuyen + ',' ) ) {
                    this.payment.shipfee = this.payment.settingShop.giangoaithanh;
                } else {
                    this.payment.shipfee = this.payment.settingShop.gianoithanh;
                }

            } else {
                if ( this.payment.hinhthuc == 'thuho' ) {
                    this.payment.shipfee = this.payment.settingShop.thuho;
                } else {
                    this.payment.shipfee = this.payment.settingShop.chanhxe;
                }
            }
        }
    }
    selectType( value ) {
        this.typeSelected = value;
        this.payment.type = value;
    }
    selectShip( value ) {
        this.shipSelected = value;
        this.payment.ship = value;
    }
    changeAmount() {
        var total = 0;
        this.payment.carts.map( function( cart ) {
            if ( cart.disct_price != 0 && cart.price >= cart.disct_price ) {
                total += cart.disct_price * cart.amount;
            } else {
                total += cart.price * cart.amount;
            }
        });
        if ( total < this.payment.settingShop.freeShip ) {
            this.payment.shipfee = this.payment.settingShop.defaultShip;
        } else {
            this.payment.shipfee = 0;
        }
        this.payment.total = total;
        if (this.voucherMess != '') {
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
        if ( this.payment.voucher == '' ) {
            this.voucherMess = '';
            this.changeAmount();
        } else {
            this.paymentService.checkVoucher( this.payment.voucher, this.payment.total ).subscribe(( res: {}) => {
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
                } else {
                    this.payment.voucher = ''
                }

                this.voucherMess = message;
            });
        }

    }
}
