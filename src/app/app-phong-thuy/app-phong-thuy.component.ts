import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AppPhongThuyService } from '../shared/services/app-phong-thuy/app-phong-thuy.service';
import { AppPhongThuyRespone } from '../shared/models/app-phong-thuy/AppPhongThuyRespone';

@Component({
  selector: 'app-app-phong-thuy',
  templateUrl: './app-phong-thuy.component.html',
  styleUrls: ['./app-phong-thuy.component.css']
})
export class AppPhongThuyComponent implements OnInit {
  status: string;
  yearOfBirth: number;
  b: number;
  respone: AppPhongThuyRespone;
  mang: String[] = ['MỘC', 'KIM', 'THỦY', 'HỎA', 'THỔ'];
  
  constructor(private activatedRoute: ActivatedRoute, private appPhongThuyService: AppPhongThuyService) { }

  ngOnInit() {
    this.status = 'init';
    let params = this.activatedRoute.snapshot.paramMap.get('yearOfBirth');
    if (params) {
      this.yearOfBirth = +params;
      this.runApp();
    }
  }

  runApp():void {
    this.status = 'ran';
    this.b = this.yearOfBirth % 12;
    this.appPhongThuyService.run(this.yearOfBirth).subscribe(
      response => this.respone = response
    );
  }
}
