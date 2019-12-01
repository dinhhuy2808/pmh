import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { Person } from '../models/person'
import { User } from '../models/user'
import { Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class UserService {

    private getPersonUrl = 'http://localhost:8080/app/user';

    constructor( private http: HttpClient ) { }

    /** GET persons from the server */

    getPersons(token:string) {
        return this.http.get( this.getPersonUrl+'/'+token ).pipe(
                map(this.extractData));
    }
    
    getPersonsByPhone(token:string,phone:string){
        return this.http.get( this.getPersonUrl+'/get-by-phone/'+token+'/'+phone ).pipe(
                map(this.extractData));
    }

    checkUserByPhone(phone: string){
        return this.http.get( this.getPersonUrl + "/check/" + phone  ).pipe(
            map(this.extractData));
        
    }

    getPersonsByNameFilteredByRole( name: string, role: string ) {
        return this.http.get( this.getPersonUrl + "/" + name + "/" + role )
           /* .map( this.extractData )
            .catch( this.handleErrorObservable )*/;

    }

    addNewUser(user:User) {
         const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})};
        let data = {
            user: user,
        }
        return this.http.post(this.getPersonUrl, data, httpOptions).pipe(
            map(this.extractData)
            )
    }
    
    editUser(user:User,token:string) {
        const httpOptions = {
           headers: new HttpHeaders({'Content-Type': 'application/json'})};
       let data = {
           user: user,
       }
       return this.http.put(this.getPersonUrl+"/"+token, user, httpOptions).pipe(
           map(this.extractData)
           )
   }
    
    login(user:User){
        const httpOptions = {
                headers: new HttpHeaders({'Content-Type': 'application/json'})};
            let data = {
                user: user,
            }
            return this.http.post(this.getPersonUrl+"/login", data, httpOptions).pipe(
                map(this.extractData)
                )
    }
    deletePerson(person:Person) {
        /*let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });*/
         return this.http.post(this.getPersonUrl+'/delete', person/*, options*/)
         /*.map( this.extractData )
         .catch( this.handleErrorObservable )*/
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
