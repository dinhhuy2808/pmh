import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../shared/services/product.service'
import { UserService } from '../shared/services/user.service'
import { Product } from '../shared/models/product'
import { CategoryScreen } from '../shared/screenvars/CategoryScreen'
import { CookieService } from 'ngx-cookie-service';
@Component( {
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.css'],
    providers: [ProductService,UserService]
})
export class CategoryComponent implements OnInit {
    isShowAll: boolean = false;
    isAdmin: boolean = false;
    size: number;
    menh: string;
    mau: string;
    tuoi: string;
    keyword: string;
    name: string;
    page: string;
    categoryscreens: CategoryScreen[];
    loading:boolean = true;
    constructor( private activatedRoute: ActivatedRoute, private router: Router, 
            private productService: ProductService,private userService: UserService, private cookieService: CookieService ) { 
        activatedRoute.params.subscribe(val => {
            this.loading = true;
            this.categoryscreens = [];
            this.name = this.activatedRoute.snapshot.paramMap.get( 'name' );
            this.page = this.activatedRoute.snapshot.paramMap.get( 'page' );
            if (this.name == 'Search') {
                this.activatedRoute.queryParams.subscribe(params => {
                    this.keyword = params['keyword'];
                    this.productService.search( this.keyword , this.page).subscribe( res => {
                        if (res != '203') {
                            this.categoryscreens = res;
                        }
                        this.loading = false;
                        if (this.cookieService.check('token')) {
                            this.userService.isAdmin( this.cookieService.get( 'token' ) ).subscribe( res => {
                                if ( res == true ) {
                                    this.isAdmin = true;
                                }
                            });
                        }
                    });
                });
                
            } else {
                this.productService.getProductByCategoryName( this.name , this.page).subscribe( res => {
                    if (res != '203') {
                        this.categoryscreens = res;
                    }
                    this.loading = false;
                    if (this.cookieService.check('token')) {
                        this.userService.isAdmin( this.cookieService.get( 'token' ) ).subscribe( res => {
                            if ( res == true ) {
                                this.isAdmin = true;
                            }
                        });
                    }
                    
                });
            }
        });
        
    }

    ngOnInit() {
        this.name = this.activatedRoute.snapshot.paramMap.get( 'name' );
        this.page = this.activatedRoute.snapshot.paramMap.get( 'page' );
        if (this.name == 'Search') {
            this.activatedRoute.queryParams.subscribe(params => {
                this.keyword = params['keyword'];
                this.productService.search( this.keyword , this.page).subscribe( res => {
                    if (res != 203) {
                        this.categoryscreens = res;
                    }
                    this.loading = false;
                    if (this.cookieService.check('token')) {
                        this.userService.isAdmin( this.cookieService.get( 'token' ) ).subscribe( res => {
                            if ( res == true ) {
                                this.isAdmin = true;
                            }
                            
                        });
                    }
                });
            });
            
        } else {
            this.productService.getProductByCategoryName( this.name , this.page).subscribe( res => {
                if (res != '203') {
                    this.categoryscreens = res;
                }
                this.loading = false;
                if (this.cookieService.check('token')) {
                    this.userService.isAdmin( this.cookieService.get( 'token' ) ).subscribe( res => {
                        if ( res == true ) {
                            this.isAdmin = true;
                        }
                      
                    });
                }
            });
        }
       
    }

    filter() {

    };
    addQuanity() {

    }
    goToPage(page){
        let productUrl = 'category/' + this.name +'/' +page;
        this.router.navigate( [productUrl] );
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
