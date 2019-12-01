import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../shared/services/product.service'
import { Product } from '../shared/models/product'
import { CategoryScreen } from '../shared/screenvars/CategoryScreen'
import { CookieService } from 'ngx-cookie-service';
@Component( {
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.css'],
    providers: [ProductService]
})
export class CategoryComponent implements OnInit {
    isShowAll: boolean = false;
    isAdmin: boolean = true;
    size: number;
    menh: string;
    mau: string;
    tuoi: string;
    keyword: string;
    name: string;
    page: string;
    categoryscreens: CategoryScreen[];
    constructor( private activatedRoute: ActivatedRoute, private router: Router, private productService: ProductService, private cookieService: CookieService ) { 
        activatedRoute.params.subscribe(val => {
            this.name = this.activatedRoute.snapshot.paramMap.get( 'name' );
            this.page = this.activatedRoute.snapshot.paramMap.get( 'page' );
            this.productService.getProductByCategoryName( this.name , this.page).subscribe( res => {
                this.categoryscreens = res;
                console.log( this.categoryscreens )
            });
        });
        
    }

    ngOnInit() {
        this.name = this.activatedRoute.snapshot.paramMap.get( 'name' );
        this.page = this.activatedRoute.snapshot.paramMap.get( 'page' );
        this.productService.getProductByCategoryName( this.name , this.page).subscribe( res => {
            this.categoryscreens = res;
            console.log( this.categoryscreens )
        });
    }

    filter() {

    };
    addQuanity() {

    }

    navigateToProductDetail( value ) {
        let productUrl = 'product/detail/' + value.replace( / /g, '-' );
        this.router.navigate( [productUrl] );
    }
    navigateToProductEdit( value ) {
        let productUrl = 'product/edit/' + value.replace( / /g, '-' );
        this.router.navigate( [productUrl] );
    }
    
    addProduct() {
        let productUrl = 'product/add/' + this.name;
        this.router.navigate( [productUrl] );
    }
}
