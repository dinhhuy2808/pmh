import { Component, OnInit } from '@angular/core';
import {Payment} from '../../shared/models/payment';
import {Size} from '../../shared/models/size';
import {PaymentScreen} from '../../shared/screenvars/PaymentScreen';
import {PaymentService} from '../../shared/services/payment.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  providers: [PaymentService]
})
export class CheckoutComponent implements OnInit {
    payment : PaymentScreen = new PaymentScreen();
    isAdmin:boolean = true;
    sizes : Size[]=[new Size(),new Size(),new Size()];
    typeSelected: string='';
shipSelected: string = '';
voucherMess: string = '';
  constructor( private activatedRoute: ActivatedRoute, private router: Router, private paymentService: PaymentService, private cookieService: CookieService ) { }

  ngOnInit() {
      if (this.cookieService.check('token')) {
          this.paymentService.checkoutLogin(this.cookieService.get('token')).subscribe( res => {
              this.payment = <PaymentScreen>res;
          });
      }
      

  }
  createPayment () {
      if (this.cookieService.check('token')) {
          if (this.shipSelected == '' ) {
              alert ('Xin chọn phương thức vận chuyển.');
          } else if ( this.typeSelected == '') {
              alert ('Xin chọn phương thức thanh toán.')
          }
          else {
              this.payment.ship = this.shipSelected;
              this.payment.type = this.typeSelected;
              this.paymentService.createPayment(this.payment, this.cookieService.get('token')).subscribe( res => {
                  this.router.navigate(['']);
              });
          }
         
      }
  }

  selectType(value){
      this.typeSelected = value;
      this.payment.type = value;
  }
  selectShip(value){
      this.shipSelected = value;
      this.payment.ship = value;
  }
  changeAmount(){
      var total = 0;
      this.payment.carts.map( function( cart ) {
          if (cart.disct_price !=0 && cart.price >= cart.disct_price) {
              total += cart.disct_price*cart.amount;
          } else {
              total += cart.price*cart.amount;
          }
      });
      if (total < this.payment.settingShop.freeShip) {
          this.payment.shipfee = this.payment.settingShop.defaultShip;
      } else {
          this.payment.shipfee = 0;
      }
      this.payment.total = total;
  }
  applyVoucher(){
      if (this.payment.voucher == '') {
          this.voucherMess = '';
      } else {
          this.paymentService.checkVoucher(this.payment.voucher).subscribe( ( res: {} ) => {
              var message = '';
              for ( const [key, value] of Object.entries( res ) ) {
                  if(key =='message') {
                      var message = value as string;
                  }
               }
              if(message.split('###').length > 1){
                  var discount = Number(message.split('###')[1]);
                  if (discount > 100) {
                      this.payment.total = this.payment.total - discount;
                  } else {
                      this.payment.total = this.payment.total*discount/100;
                  }
              }
             
              this.voucherMess = message;
          });
      }
      
  }
}
