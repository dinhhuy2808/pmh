import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../shared/services/person.service'
import { Observable } from 'rxjs';
import { User } from '../../shared/models/user';
import {Router} from '@angular/router';

@Component( {
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
    keyword: string = '';
    role: string = '';
    user: User[];

    constructor( private personService: PersonService,private router : Router ) { }

    ngOnInit() {
        this.personService.getPersons().subscribe(res=>{
            /*this.user = res;
            console.log(this.user);*/
        });      
    }
   /* findPersons() {
        if ( this.keyword != ''
            || this.role != '' ) {
            this.personService.getPersonsByNameFilteredByRole( this.keyword, this.role ).subscribe((res)=>{
                this.persons = res.body;
                console.log(res)
            });      
        } else {
            this.personService.getPersons().subscribe((res)=>{
                this.persons = res.body;
                console.log(res)
            });      
        }
        
        
        

    }
    
    deletePerson(person:Person){
        this.personService.deletePerson(person).subscribe();
        window.location.reload();
    }*/
}
