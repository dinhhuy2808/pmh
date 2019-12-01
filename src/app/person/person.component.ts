import { Component, OnInit } from '@angular/core';
import { PersonService } from '../shared/services/person.service'
import { Observable } from 'rxjs';
import { User } from '../shared/models/user';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'],
  providers : [PersonService]
})
export class PersonComponent implements OnInit {
    title = 'Angular Exercise !!!';
  constructor(private personService : PersonService) {}
  
  ngOnInit() {
  }
  
}
