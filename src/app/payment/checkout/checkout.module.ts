import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CheckoutComponent } from './checkout.component';
import { DatePipe } from '../../shared/pipes/date-pipe';
@NgModule({
  declarations: [
CheckoutComponent
  ],
  imports: [
            BrowserModule,
            FormsModule,
            HttpClientModule,
            RouterModule
  ],
  exports: [CheckoutComponent],
  providers: []
})
export class CheckoutModule {}
