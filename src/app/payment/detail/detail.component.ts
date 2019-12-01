import { Component, OnInit } from '@angular/core';
import {Payment} from '../../shared/models/payment';
import {Settingshop} from '../../shared/models/settingshop';
import {Size} from '../../shared/models/size';
import {Cart} from '../../shared/models/cart';
import {PaymentScreen} from '../../shared/screenvars/PaymentScreen';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {PaymentService} from '../../shared/services/payment.service';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [PaymentService]
})
export class DetailComponent implements OnInit {
    paymentscreen : PaymentScreen = new PaymentScreen();
    payment: Payment = new Payment();
    isAdmin:boolean = true;
    carts : Array<Cart> = new Array();
    settingShop: Settingshop = new Settingshop();
id:string = '';
  constructor( private activatedRoute: ActivatedRoute, private router: Router, private paymentService: PaymentService, private cookieService: CookieService ) { }

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
            
            console.log( data );
        } );
    } else {
        this.router.navigate(['']);
    }
  }

}
