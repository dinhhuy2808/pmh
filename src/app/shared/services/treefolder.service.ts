import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Person } from '../models/person';
import { Category } from '../models/category'
import { Treefolder } from '../models/treefolder'
import { Settingshop } from '../models/settingshop'
import { Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Index } from '../index';
@Injectable()
export class TreefolderService {
    index:Index = new Index();
    private getTreeFolderUrl = 'http://'+this.index.host+':8080/app/treefolder';

    constructor( private http: HttpClient ) { }

    /** GET persons from the server */

    getTreefolder() {
        return this.http.get( this.getTreeFolderUrl ).pipe(
            map( this.extractData ) );
    }

    getSettingShop() {
        return this.http.get( this.getTreeFolderUrl + '/get-setting-shop' ).pipe(
            map( this.extractData ) );
    }

    addTreeFolder( folder_name: string, cat_name: string, token: string ) {
        const httpOptions = {
            headers: new HttpHeaders( { 'Content-Type': 'application/json;charset=UTF-8'})
        };
        let data = {
            folder_name: folder_name,
            cat_name: cat_name,
        }
        return this.http.put( this.getTreeFolderUrl + '/' + token, data, httpOptions ).pipe(
            map( this.extractData )
        )
    }

    updateSettingShop( settingShop: Settingshop, token: string ) {
        const httpOptions = {
            headers: new HttpHeaders( { 'Content-Type': 'application/json' })
        };
        let data = {
            Settingshop: settingShop,
        }
        return this.http.put( this.getTreeFolderUrl + '/update-setting-shop/' + token, settingShop, httpOptions ).pipe(
            map( this.extractData )
        )
    }

    checkCatName( token: string, name: string ) {
        return this.http.get( this.getTreeFolderUrl + '/check-cat-name/' + name + '/' + token + '' ).pipe(
            map( this.extractData ) );
    }

    updateCatName(token: string , treeName:string, catName:string, newCatName: string) {
        const httpOptions = {
            headers: new HttpHeaders( { 'Content-Type': 'application/json' })
        };
        return this.http.put( this.getTreeFolderUrl + '/update-cat-name/' + token+'/'+treeName+'/'+catName+'/'+newCatName, '', httpOptions ).pipe(
            map( this.extractData )
        )
    }
    deleteCat(token: string , catName:string) {
        const httpOptions = {
            headers: new HttpHeaders( { 'Content-Type': 'application/json' })
        };
        return this.http.get( this.getTreeFolderUrl + '/delete-cat/' + token+'/'+catName ).pipe(
            map( this.extractData )
        )
    }
    updateIndex( tree: Treefolder, token: string ) {
        const httpOptions = {
            headers: new HttpHeaders( { 'Content-Type': 'application/json' })
        };
        return this.http.put( this.getTreeFolderUrl + '/update-index/' + token, tree, httpOptions ).pipe(
            map( this.extractData )
        )
    }
    private extractData( res: Response ) {
        let body = res;
        return body || {};
    }
    private handleErrorObservable( error: Response | any ) {
        console.error( error.message || error );
        return Observable.throw( error.message || error );
    }
}
