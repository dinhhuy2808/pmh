import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { Person } from '../models/person'
import { Observable } from 'rxjs';
import { Index } from '../index';

@Injectable()
export class PersonService {
    index:Index = new Index();
    private getPersonUrl = 'http://'+this.index.host+':8080/app/user';

    constructor( private http: HttpClient ) { }

    /** GET persons from the server */

    getPersons() {
        return this.http.get( this.getPersonUrl );
    }

    getPersonsByNameFilteredByRole( name: string, role: string ) {
        return this.http.get( this.getPersonUrl + "/" + name + "/" + role )
           /* .map( this.extractData )
            .catch( this.handleErrorObservable )*/;

    }

    addNewPerson( name: string, role: string, date: number, gender: string ) {
        var url =  this.getPersonUrl + "/add" + "/" + name + "/" + role + "/" + date.toString().replace(/-/g, '') + "/" + gender ;
        console.log(url);
         return this.http.get(url)
         /*.map( this.extractData )
         .catch( this.handleErrorObservable )*/
    }
    
    deletePerson(person:Person) {
        /*let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });*/
         return this.http.post(this.getPersonUrl+'/delete', person/*, options*/)
         /*.map( this.extractData )
         .catch( this.handleErrorObservable )*/
    }
    
    private extractData( res: Response ) {
        let body = res.json();
        return body;
    }
    private handleErrorObservable( error: Response | any ) {
        console.error( error.message || error );
        return Observable.throw( error.message || error );
    }
}
