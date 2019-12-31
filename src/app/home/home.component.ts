import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/models/product';
import { ProductService } from '../shared/services/product.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Router,ActivatedRoute } from '@angular/router';
import { CategoryScreen } from '../shared/screenvars/CategoryScreen'
@Component( {
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    providers: [ProductService]
})
export class HomeComponent implements OnInit {

    products: Product[];
    isNews: boolean[];
    isFreeShips: boolean[];
    distctPrice: boolean[];
    isMobile: boolean = false;
    folderId: string;
    page: number;
    isAdmin: boolean = false;
categoryscreens: CategoryScreen[];
    constructor( private deviceService: DeviceDetectorService , private router: Router, private productService: ProductService,private activatedRoute: ActivatedRoute) { 
        activatedRoute.params.subscribe(val => {
            this.isMobile = this.deviceService.isMobile();
            this.productService.getLatestProduct().subscribe(res => {
                if(Array.isArray(res)) {
                    this.categoryscreens = res;
                }
            });
        });
    }

    ngOnInit() {
        this.isMobile = this.deviceService.isMobile();
        if (this.categoryscreens.length ==0) {
            this.productService.getLatestProduct().subscribe(res => {
                if(Array.isArray(res)) {
                    this.categoryscreens = res;
                }
            });
        }
       
    }
    ao() {
        this.router.navigate( ['category/Search/1'], { queryParams: { keyword: 'áo' } } );
    }
    dam() {
        this.router.navigate( ['category/Search/1'], { queryParams: { keyword: 'đầm' } } );
    }
    phukien() {
        this.router.navigate( ['category/Search/1'], { queryParams: { keyword: 'phụ kiện' } } );
    }
    best() {
        this.router.navigate( ['category/Search/1'], { queryParams: { keyword: 'best seller' } } );
    }
    arrival() {
        this.router.navigate( ['category/Search/1'], { queryParams: { keyword: 'new arrival' } } );
    }
    navigateToProductDetail( value ) {
        let productUrl = 'product/detail/' + value.replace( / /g, '-' );
        this.router.navigate( [productUrl] );
    }
    navigateToProductEdit( value ) {
        let productUrl = 'product/edit/' + value.replace( / /g, '-' );
        this.router.navigate( [productUrl] );
    }
}
