import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { VoucherComponent } from './voucher.component';
import { DatePipe } from '../../shared/pipes/date-pipe';
@NgModule({
  declarations: [
    VoucherComponent,
    DatePipe
  ],
  imports: [
            BrowserModule,
            FormsModule,
            HttpClientModule,
            RouterModule,
  ],
  exports: [VoucherComponent],
  providers: []
})
export class VoucherModule {}
