import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { Person } from '../models/person'
import { Settingshop } from '../models/settingshop'
import { Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class TreefolderService {

    private getTreeFolderUrl = 'http://localhost:8080/app/treefolder';

    constructor( private http: HttpClient ) { }

    /** GET persons from the server */

    getTreefolder() {
        return this.http.get( this.getTreeFolderUrl ).pipe(
            map(this.extractData));
    }
    
    getSettingShop() {
        return this.http.get( this.getTreeFolderUrl + '/get-setting-shop').pipe(
            map(this.extractData));
    }
    
    addTreeFolder(folder_name: string, cat_name:string, token:string) {
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})};
        let data = {
            folder_name: folder_name,
            cat_name: cat_name,
        }
        return this.http.post(this.getTreeFolderUrl + '/'+token, data, httpOptions).pipe(
            map(this.extractData)
            )
    }

    updateSettingShop(settingShop: Settingshop,token:string) {
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})};
        let data = {
            Settingshop: settingShop,
        }
        return this.http.put(this.getTreeFolderUrl + '/update-setting-shop/'+token, settingShop, httpOptions).pipe(
            map(this.extractData)
            )
    }
    
    private extractData( res: Response ) {
        let body = res;
        return  body || { };
    }
    private handleErrorObservable( error: Response | any ) {
        console.error( error.message || error );
        return Observable.throw( error.message || error );
    }
}
