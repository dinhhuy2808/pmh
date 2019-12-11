import { Component, OnInit } from '@angular/core';
import {Payment} from '../../shared/models/payment';
import {Settingshop} from '../../shared/models/settingshop';
import {Size} from '../../shared/models/size';
import {Cart} from '../../shared/models/cart';
import {PaymentScreen} from '../../shared/screenvars/PaymentScreen';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {PaymentService} from '../../shared/services/payment.service';
import {UserService} from '../../shared/services/user.service';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [PaymentService,UserService]
})
export class DetailComponent implements OnInit {
    paymentscreen : PaymentScreen = new PaymentScreen();
    payment: Payment = new Payment();
    isAdmin:boolean = false;
    carts : Array<Cart> = new Array();
    settingShop: Settingshop = new Settingshop();
id:string = '';
  constructor( private activatedRoute: ActivatedRoute, private router: Router, private paymentService: PaymentService
          , private cookieService: CookieService, private userService: UserService ) { }

  ngOnInit() {
    if(this.cookieService.check('token')){
        this.id = this.activatedRoute.snapshot.paramMap.get( 'id' );
        this.paymentService.getPaymentDetail(this.cookieService.get('token'), this.id).subscribe(( data: {} ) => {
            for ( const [key, value] of Object.entries( data ) ) {
                if (key == 'payment') {
                    this.payment = data[key];
                } else if (key == 'carts'){
                    this.carts = data[key];
                } else {
                    this.settingShop = data[key];
                }
            }
            this.userService.isAdmin(this.cookieService.get('token')).subscribe(res => {
                if (res==true){
                    this.isAdmin = true;
                }
            });
            console.log( data );
        } );
    } else {
        this.router.navigate(['']);
    }
  }
  changeAmount() {
      var total = 0;
      this.paymentscreen.carts.map( function( cart ) {
          if ( cart.disct_price != 0 && cart.price >= cart.disct_price ) {
              total += cart.disct_price * cart.amount;
          } else {
              total += cart.price * cart.amount;
          }
      });
      if ( total < this.settingShop.freeShip ) {
          this.paymentscreen.shipfee = this.settingShop.defaultShip;
      } else {
          this.paymentscreen.shipfee = 0;
      }
      this.paymentscreen.total = total;
  }
}
