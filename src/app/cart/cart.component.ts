import { Component, OnInit, Inject } from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef } from "@angular/material/dialog";
import { ProductService } from '../shared/services/product.service'
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from "../app.component";
import { Cart } from '../shared/models/cart'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [ ProductService]
})
export class CartComponent implements OnInit {
  cartDetail: Map<string, Cart[]> = new Map<string, Cart[]>();
  constructor(public dialogRef: MatDialogRef<CartComponent>,private productService: ProductService, private cookieService: CookieService) { }

  ngOnInit() {
      if (this.cookieService.check('token')){
          this.productService.getCartDetail(this.cookieService.get('token')).subscribe(( data: {} ) => {
              for ( const [key, value] of Object.entries( data ) ) {
                  this.cartDetail.set( key, data[key] );
              }
          } );
      } else {
          this.productService.getCartNotLogin(this.cookieService.get('cart')).subscribe(( data: {} ) => {
              for ( const [key, value] of Object.entries( data ) ) {
                  this.cartDetail.set( key, data[key] );
              }
          } );
      }
      
  }
  close() {
      this.dialogRef.close();
    }
}
