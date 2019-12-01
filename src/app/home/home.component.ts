import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/models/product';
import { DeviceDetectorService } from 'ngx-device-detector';
@Component({
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

  constructor(private deviceService: DeviceDetectorService) { }

  ngOnInit() {
      this.isMobile = this.deviceService.isMobile();
  }

}
