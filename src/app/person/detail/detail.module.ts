import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DetailComponent } from './detail.component';
import { DatePipe } from '../../shared/pipes/date-pipe'

@NgModule({
  declarations: [
    DetailComponent,
    DatePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [DetailComponent]
})
export class DetailModule { }
