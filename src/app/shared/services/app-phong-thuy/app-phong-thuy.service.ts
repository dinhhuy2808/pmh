import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AppPhongThuyRespone } from '../../models/app-phong-thuy/AppPhongThuyRespone';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppPhongThuyService {

  private url: string = 'http://localhost:8080/app/app-phong-thuy/';

  respone: AppPhongThuyRespone;

  constructor(private http: HttpClient) { }

  run(yearOfBirth: number) {
    return this.http.get<AppPhongThuyRespone>(this.url + yearOfBirth);
  }
}
