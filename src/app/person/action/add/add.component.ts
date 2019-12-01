import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../../shared/services/person.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  providers : [PersonService]
})
export class AddComponent implements OnInit {
    name : string;
    birthdate :number;
    gender :string;
    role :string;
  constructor( private personService : PersonService, private router : Router) { }

  ngOnInit() {
  }

  AddPerson(): void {
      this.personService.addNewPerson(this.name, this.role.toString().replace('-', ''), this.birthdate, this.gender).subscribe();
      this.router.navigate([`/person/detail`]);
  }
}
