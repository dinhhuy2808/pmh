import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Size } from '../../shared/models/size'
import { Product } from '../../shared/models/product'
import { Thuoctinh } from '../../shared/models/thuoctinh'
import { ProducScreenDtail } from '../../shared/screenvars/ProducScreenDetail'
import { ProductService } from '../../shared/services/product.service'
import { CookieService } from 'ngx-cookie-service';
import { SlicePipe } from '@angular/common';
@Component( {
    selector: 'app-product-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.css'],
    providers: [ProductService]
})
export class DetailComponent implements OnInit {
    productScreenDetail: ProducScreenDtail = new ProducScreenDtail();
    category: string = '';
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
    total: number = 0;
    imagesSource: string[];

    slideIndex: number = 0;
    imgDisplay: string;
    zoomImage: boolean = false;

    constructor( private activatedRoute: ActivatedRoute, private router: Router, private productService: ProductService, private cookieService: CookieService ) { }

    ngOnInit() {
        this.name = this.activatedRoute.snapshot.paramMap.get( 'name' );
        this.productService.getProduct( this.name , 'detail').subscribe( res => {
            this.productScreenDetail = <ProducScreenDtail>res;
            this.product = this.productScreenDetail.product;
            this.sizes = this.productScreenDetail.sizes;
            this.selectedSize = this.sizes[0].size;
            this.handleSelectedSize(this);
            this.thuoctinh = this.productScreenDetail.thuoctinh;
            if (this.thuoctinh.menh == 'All;') {
                this.thuoctinh.menh = 'Tất cả mệnh';
            }
            if (this.thuoctinh.tuoi == 'All;') {
                this.thuoctinh.tuoi = 'Tất cả tuổi';
            }
            this.description = this.productScreenDetail.description;
            this.imagesSource = this.product.image.split( ";" );
            this.category = this.product.cat_id.toString();
            this.showSlides(this.slideIndex);
        });
    }

    handleSelectedSize( e ) {
        this.sizes.map( function( size ) {
            if ( size.size == e.selectedSize ) {
                if ( size.disct_price == 0 ) {
                    e.priceAfter = size.price;
                    e.priceBefore = size.price;
                } else {
                    e.priceAfter = size.disct_price;
                    e.priceBefore = size.price;
                }
                e.info = size.info;
                e.total = e.priceAfter * e.quantity;
            }
        });
    }

    minus() {
        this.quantity = --this.quantity < 1 ? 1 : --this.quantity;
        this.total = this.priceAfter * this.quantity;
    }
    plus() {
        this.quantity++;
        this.total = this.priceAfter * this.quantity;
    }

    addToCart() {
        if ( this.cookieService.check( 'token' ) ) {
            let token = this.cookieService.get( 'token' );
            this.productService.addToCart( this.product.product_id.toString()
                , this.quantity.toString(),
                this.selectedSize, token ).subscribe( res => {
                    if ( res == '200' ) {
                        window.location.reload();
                    } else {
                    }

                });
        } else {
            if ( this.cookieService.check( 'cart' ) ) {
                var carts = this.cookieService.get( 'cart' ).split( '|' );
                var isExist = false;
                var productId = this.product.product_id.toString();
                var size = this.selectedSize;
                var quantity = this.quantity;
                var cartUpdated = carts.map( function( cart ) {
                    var cartDetail = cart.split( ';' );
                    if ( ( cartDetail[0] == productId )
                        && ( cartDetail[1] == size ) ) {
                        isExist = true;
                        var newQuantity = Number( cartDetail[2] ) + Number(quantity);
                        cartDetail[2] = newQuantity.toString();
                        return cartDetail[0] + ';' + cartDetail[1] + ';' + cartDetail[2];
                    }
                }).join( '|' );
                if(isExist){
                    this.cookieService.set( 'cart', cartUpdated + '|' );
                } else {
                    this.cookieService.set( 'cart', this.cookieService.get('cart')
                    + this.product.product_id.toString() + ";" + this.selectedSize + ';' + this.quantity + '|' );
                }

            } else {
                this.cookieService.set( 'cart', this.product.product_id.toString() + ";" + this.selectedSize + ';' + this.quantity + '|' );
            }
            window.location.reload();

        }
    }

    plusSlides(n) {
        this.showSlides(this.slideIndex += n);
    }
    currentSlide(n) {
        this.showSlides(this.slideIndex = n);
    }
    showSlides(index) {
        const numberOfImages = this.imagesSource.length;
        if (index > numberOfImages-1) {
            this.slideIndex = 0;
        }
        if (index < 0) {
            this.slideIndex = numberOfImages;
        }

        let dots = document.getElementsByClassName("item-product-detail");
        if (dots.length) {
            for (let i = 0; i < dots.length; i++) {
                dots[i].className = dots[i].className.replace(" active", "");
                dots[i].parentElement.style.backgroundColor = "white";
            }
            dots[this.slideIndex].className += " active";
            dots[this.slideIndex].parentElement.style.backgroundColor = "#d639d2";
        }
        this.imgDisplay = this.imagesSource[this.slideIndex];
    }
    zoomImg() {
        this.zoomImage = true;
    }
}
