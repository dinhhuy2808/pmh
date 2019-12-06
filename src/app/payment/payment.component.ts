import { Component, OnInit } from '@angular/core';
import {Payment} from '../shared/models/payment';
import {Size} from '../shared/models/size';
import {PaymentScreen} from '../shared/screenvars/PaymentScreen';
import {PaymentService} from '../shared/services/payment.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  providers: [PaymentService]
})
export class PaymentComponent implements OnInit {
    payments: Array<Payment> = new Array();
  constructor( private activatedRoute: ActivatedRoute, private router: Router, private paymentService: PaymentService, private cookieService: CookieService ) { }

  ngOnInit() {
      this.paymentService.getPayments(this.cookieService.get('token')).subscribe(( res: Array<Payment>) => {
          this.payments = res; 
       } );
  }
  navigateToPaymentDetail(id){
      let url ='payment/detail/'+id
      this.router.navigate([url]);
  }
}
