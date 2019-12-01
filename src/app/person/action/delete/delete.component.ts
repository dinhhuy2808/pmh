import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../../shared/services/person.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  constructor( private personService : PersonService, private router : Router) { }

  ngOnInit() {
  }

}
