import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/models/user';
import { FormBuilder, FormGroup } from "@angular/forms";
import { UserService } from '../../shared/services/user.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  isAdmin: boolean = false;
  user:User = new User();
  dob: string = '';
  isValidPhone: boolean = false;
  constructor( private userService:UserService, private router : Router) { }

  ngOnInit() {

  }
   checkUserByPhone() {
    this.userService.checkUserByPhone(this.user.phone).subscribe(res => {
      if(res == false){
          this.isValidPhone = false;
      } else {
          this.isValidPhone = true;
      }
    });
  }
   register (){
       this.user.dob = this.user.dob.replace(/-/g, '');
       this.userService.addNewUser(this.user).subscribe(res => {
             this.router.navigate([`/user/login`]);
         });
   }

}
