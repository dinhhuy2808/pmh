import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { DetailComponent } from './detail.component';
import { DatePipe } from '../../shared/pipes/date-pipe';
@NgModule({
  declarations: [
DetailComponent
  ],
  imports: [
            BrowserModule,
            FormsModule,
            HttpClientModule,
            RouterModule
  ],
  exports: [DetailComponent],
  providers: []
})
export class DetailModule {}
