import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/models/product';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Router,ActivatedRoute } from '@angular/router';
@Component( {
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    products: Product[];
    isNews: boolean[];
    isFreeShips: boolean[];
    distctPrice: boolean[];
    isMobile: boolean = false;
    folderId: string;
    page: number;
    isAdmin: number;

    constructor( private deviceService: DeviceDetectorService , private router: Router) { }

    ngOnInit() {
        this.isMobile = this.deviceService.isMobile();
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
}
