import { Component, OnInit } from '@angular/core';
import { TreefolderService } from './shared/services/treefolder.service'
import { ProductService } from './shared/services/product.service'
import { Observable } from 'rxjs';
import { Person } from './shared/models/person';
import { CookieService } from 'ngx-cookie-service';
import { Router,ActivatedRoute } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './user/login/login.component';
import { ModalComponent } from './modal/modal.component';
@Component( {
    selector: 'app-root',
    templateUrl: './app.component.html',
    providers: [TreefolderService, ProductService]
} )
export class AppComponent implements OnInit {

    title = 'Angular Exercise !!!';
    isSignIn: boolean = false;
    isAdmin: boolean = false;
    gender: string = '';
    name: string = '';
    itemInCart: string = '';
    treeMap: Map<string, string[]> = new Map<string, string[]>();
    isMobile: boolean = false;

    classNameContainer: string = 'container';
    fontMobile: string = '';
    fontDescriptionArea: string = '';
    displayButtonFilter: boolean = false;
    displayFilter: boolean = true;
    search: string = '';
    constructor( private treefolderService: TreefolderService, private cookieService: CookieService, private router: Router,
        private deviceService: DeviceDetectorService, private productService: ProductService,private matDialog: MatDialog, private activatedRoute: ActivatedRoute ) { 
        
        activatedRoute.params.subscribe(val => {
            this.ngOnInit();
        });
    }

    ngOnInit() {
        this.treefolderService.getTreefolder().subscribe(( data: {} ) => {
            for ( const [key, value] of Object.entries( data ) ) {
                this.treeMap.set( key, data[key] );
            }
            if ( this.cookieService.check( 'name' ) && this.cookieService.check( 'token' ) ) {
                this.isSignIn = true;
                this.gender = this.cookieService.get( 'gender' ) == 'F' ? 'Bà' : 'Ông';
                this.name = this.cookieService.get( 'name' );
                this.itemInCart = this.cookieService.get( 'itemInCart' );
                this.productService.getCartAmount( this.cookieService.get( 'token' ) ).subscribe(( res: {} ) => {
                    for ( const [key, value] of Object.entries( res ) ) {
                       if(key =='itemInCart') {
                           this.itemInCart = value as string;
                       }
                       
                       if(key =='userType' && value == '1') {
                           this.isAdmin = true;
                       }
                    }
                } );
            } else {
                if (this.cookieService.check( 'cart' )) {
                    var carts = this.cookieService.get( 'cart' ).split( '|' );
                    var quantity = 0;
                    carts.map( function( cart ) {
                        var cartDetail = cart.split( ';' );
                        if(cart != '' && cartDetail[2] != ''){
                            quantity += Number(cartDetail[2]) ;
                        }
                        
                    })
                    
                    this.itemInCart = quantity.toString();
                }
            }

            console.log( data );
        } );
        this.isMobile = this.deviceService.isMobile();
        this.setupPage();
    }
    openDialog() {
        const dialogConfig = new MatDialogConfig();
        this.matDialog.open(CartComponent, dialogConfig);
      }
    openLoginDialog() {
        const dialogConfig = new MatDialogConfig();
        this.matDialog.open(LoginComponent, dialogConfig);
      }
    logout() {
        this.cookieService.delete( 'name' );
        this.cookieService.delete( 'token' );
        this.cookieService.delete( 'gender' );
        this.cookieService.delete( 'itemInCart' );
        this.cookieService.deleteAll();
        this.router.navigate( [`/`] );
    }
    setupPage() {
        if ( this.isMobile ) {
            this.classNameContainer = 'container-fluid';
            this.fontDescriptionArea = '45px';
            this.fontMobile = '300%';
            this.displayButtonFilter = true;
            this.displayFilter = false;
        } else {
            this.fontDescriptionArea = '20px';
            this.displayButtonFilter = false;
        }
    }
    openNav() {
        document.getElementById( 'menu-mobile' ).style.width = '70%';
        document.getElementById( 'close-area' ).style.width = '30%';
    }
    closeNav() {
        document.getElementById( 'menu-mobile' ).style.width = '0px';
        document.getElementById( 'close-area' ).style.width = '0px';
    }
    displayMenu( item: string ) {
        if (document.getElementById( item ).style.display == 'block') {
            document.getElementById( item ).style.display = 'none';
        } else {
            document.getElementById( item ).style.display = 'block';
        }
        document.getElementById( item ).style.backgroundColor = 'white';
    }
    displayCat(value) {
        if (this.isMobile) {
            this.closeNav();
        }
        let catLink = 'category/'+value.replace(/ /g,'-')+'/1';
        this.router.navigate( [catLink] );
    }
    showCart() {
        this.router.navigate( ['cart'] );
    }
    updateCart(value) {
        if (value) {
            if ( this.cookieService.check( 'name' ) && this.cookieService.check( 'token' ) ) {
                this.itemInCart = this.cookieService.get( 'itemInCart' );
                this.productService.getCartAmount( this.cookieService.get( 'token' ) ).subscribe(( res: {} ) => {
                    for ( const [key, value] of Object.entries( res ) ) {
                       if(key =='itemInCart') {
                           this.itemInCart = value as string;
                       }
                    }
                } );
            } else {
                if (this.cookieService.check( 'cart' )) {
                    var carts = this.cookieService.get( 'cart' ).split( '|' );
                    var quantity = 0;
                    carts.map( function( cart ) {
                        var cartDetail = cart.split( ';' );
                        if(cart != '' && cartDetail[2] != ''){
                            quantity += Number(cartDetail[2]) ;
                        }
                        
                    })
                    
                    this.itemInCart = quantity.toString();
                }
            }
        }
    }
    Search(){
        this.router.navigate( ['category/Search/1'], { queryParams: { keyword: this.search } } );
    }
    openChinhSachKhachSi() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {
            name: 'ChinhSachKhachSi',
        }
        const dialogRef = this.matDialog.open( ModalComponent, dialogConfig );
    }
    openChinhSachGiaoNhan() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {
            name: 'ChinhSachGiaoNhan',
        }
        const dialogRef = this.matDialog.open( ModalComponent, dialogConfig );
    }
    openChinhSachDoiHang() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {
            name: 'ChinhSachDoiHang',
        }
        const dialogRef = this.matDialog.open( ModalComponent, dialogConfig );
    }
    openHuongDan() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {
            name: 'HuongDanMuaHang',
        }
        const dialogRef = this.matDialog.open( ModalComponent, dialogConfig );
    }
}
