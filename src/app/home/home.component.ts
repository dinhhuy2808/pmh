import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/models/product';
import { ProductService } from '../shared/services/product.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Router,ActivatedRoute } from '@angular/router';
import { CategoryScreen } from '../shared/screenvars/CategoryScreen'
import { DynamicScriptLoaderService } from '../shared/services/DynamicScriptLoaderService.service';
@Component( {
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    providers: [ProductService,DynamicScriptLoaderService]
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
    constructor( private deviceService: DeviceDetectorService , private router: Router, private productService: ProductService,private activatedRoute: ActivatedRoute,private dynamicScriptLoader: DynamicScriptLoaderService) { 
        activatedRoute.params.subscribe(val => {
            this.ngOnInit();
        });
    }

    ngOnInit() {
        this.isMobile = this.deviceService.isMobile();
        if (this.categoryscreens != undefined &&this.categoryscreens.length ==0) {
            this.productService.getLatestProduct().subscribe(res => {
                if(Array.isArray(res)) {
                    this.categoryscreens = res;
                    
                }
            });
        }
        this.loadScripts();
       
    }
    private loadScripts() {
        // You can load multiple scripts by just providing the key as argument into load method of the service
        this.dynamicScriptLoader.load('jssor-slider').then(data => {
          // Script Loaded Successfully
            console.log('loaf jssor-slider.js complete !!!')
        }).catch(error => console.log(error));
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
