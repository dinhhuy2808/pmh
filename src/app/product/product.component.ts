import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Size } from '../shared/models/size'
import { Product } from '../shared/models/product'
import { Thuoctinh } from '../shared/models/thuoctinh'
import { ProducScreenDtail } from '../shared/screenvars/ProducScreenDetail'
import { ProductService } from '../shared/services/product.service'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [ProductService]
})
export class ProductComponent implements OnInit {
  productScreenDetail: ProducScreenDtail = new ProducScreenDtail();
  name: string = '';
  product: Product = new Product();
  sizes: Size[];
  thuoctinh: Thuoctinh = new Thuoctinh();
  description: string = '';
  selectedSize: string = '';
  priceBefore: number = 0;
  priceAfter: number = 0;
  info: string = '';
  quantity: number = 1;
  total : number = 0;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private productService: ProductService) { }

  ngOnInit() {
    this.name = this.activatedRoute.snapshot.paramMap.get('name');
    this.productService.getProduct(this.name).subscribe(res => {
      this.productScreenDetail = <ProducScreenDtail>res;
      this.product = this.productScreenDetail.product;
      this.sizes = this.productScreenDetail.sizes;
      this.thuoctinh = this.productScreenDetail.thuoctinh;
      this.description = this.productScreenDetail.description;
    });

  }

  
}
