import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { CategoryComponent } from './category.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CategoryComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [CookieService],
  exports: [CategoryComponent],
})
export class CategoryModule { }
