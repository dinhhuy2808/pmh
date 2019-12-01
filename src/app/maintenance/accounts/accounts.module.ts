import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AccountsComponent } from './accounts.component';
import { DatePipe } from '../../shared/pipes/date-pipe';
@NgModule({
  declarations: [
    AccountsComponent,
    DatePipe
  ],
  imports: [
            BrowserModule,
            FormsModule,
            HttpClientModule,
            RouterModule,
  ],
  exports: [AccountsComponent],
  providers: []
})
export class AccountsModule {}
