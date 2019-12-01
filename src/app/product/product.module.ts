import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { ProductComponent } from './product.component';
import { AddModule } from './add/add.module';
import { EditModule } from './edit/edit.module';
import { RouterModule } from '@angular/router';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  declarations: [
    ProductComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AddModule,
    EditModule,
    RouterModule
  ],
  providers: [CookieService],
  exports: [ProductComponent],
})
export class ProductModule { }
