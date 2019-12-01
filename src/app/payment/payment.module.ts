import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { PaymentComponent } from './payment.component';
import { DetailComponent } from './detail/detail.component';
import { DetailModule } from './detail/detail.module';
import { CheckoutModule } from './checkout/checkout.module';
import { DatePipe } from '../shared/pipes/date-pipe';
@NgModule({
  declarations: [
PaymentComponent
  ],
  imports: [
            BrowserModule,
            FormsModule,
            HttpClientModule,
            DetailModule,
            RouterModule,
            CheckoutModule
  ],
  exports: [PaymentComponent],
  providers: []
})
export class PaymentModule {}
