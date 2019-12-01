import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { AddComponent } from './add.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AddComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
  ],
  providers: [CookieService],
  exports: [AddComponent],
})
export class AddModule { }
