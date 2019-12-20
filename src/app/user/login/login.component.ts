import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/models/user';
import { LoginInfo } from '../../shared/models/login-info';
import { FormBuilder, FormGroup } from "@angular/forms";
import { UserService } from '../../shared/services/user.service';
import {Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
    user: User = new User();
    phone:string = '';
    password:string = '';
    loginInfo: LoginInfo = new LoginInfo();
  constructor(public dialogRef: MatDialogRef<LoginComponent>,private userService:UserService, private cookieService: CookieService, private router : Router) { }

  ngOnInit() {
  }

  login(){
      this.userService.login(this.user).subscribe(res => {
          this.loginInfo = <LoginInfo>res;
          if(this.loginInfo.message == '200'){
              this.cookieService.set( 'token', this.loginInfo.token );
              this.cookieService.set( 'name', this.loginInfo.name );
              this.cookieService.set( 'gender', this.loginInfo.gender );
              this.cookieService.set( 'itemInCart', this.loginInfo.itemInCart );
              window.location.href = "/"
          } else {
              
          }
        });
  }
  close() {
      this.dialogRef.close();
    }
}
