import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AppPhongThuyRespone } from '../../models/app-phong-thuy/AppPhongThuyRespone';
import { HttpClient } from '@angular/common/http';
import { Index } from '../../index';

@Injectable({
  providedIn: 'root'
})
export class AppPhongThuyService {
    index: Index = new Index();
  private url: string = 'http://'+this.index.host+':8080/app/app-phong-thuy/';

  respone: AppPhongThuyRespone;

  constructor(private http: HttpClient) { }

  run(yearOfBirth: number) {
    return this.http.get<AppPhongThuyRespone>(this.url + yearOfBirth);
  }
}
