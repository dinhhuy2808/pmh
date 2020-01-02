import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Size } from '../shared/models/size'
import { Product } from '../shared/models/product'
import { Thuoctinh } from '../shared/models/thuoctinh'
import { ProducScreen } from '../shared/screenvars/ProducScreen'
import { ProductService } from '../shared/services/product.service'
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [ProductService]
})
export class ProductComponent implements OnInit {
  products: Array<ProducScreen> = new Array();
  addedAmount : Array<number> = new Array();
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private productService: ProductService, private cookieService: CookieService) { }

  ngOnInit() {
      this.productService.getAllProduct(this.cookieService.get('token')).subscribe( res => {
          if (Array.isArray(res)) {
              this.products = res;
          }
      });
  }
  add(value){
      this.products[value].quantity = Number(this.products[value].quantity) + Number(this.addedAmount[value]);
      this.addedAmount[value] = 0;
  }
  
}
