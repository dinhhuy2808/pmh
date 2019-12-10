import { Component, OnInit, Inject, Optional } from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { UserService } from '../shared/services/user.service'
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../shared/models/user'
import { LoginInfo } from '../shared/models/login-info';
@Component( {
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css'],
    providers: [UserService]
})
export class ModalComponent implements OnInit {
    user: User = new User();
    loginInfo: LoginInfo = new LoginInfo();
    dataRequest: any;
    message: string = '';
    constructor( public dialogRef: MatDialogRef<ModalComponent>, private userService: UserService, private cookieService: CookieService,
        private activatedRoute: ActivatedRoute, private router: Router
        , @Optional() @Inject( MAT_DIALOG_DATA ) public data: any ) {
        this.dataRequest = data;
    }

    ngOnInit() {
        if ( this.dataRequest.name == 'RequestSignUp' ) {
            this.user.phone = this.dataRequest.phone;
            this.user.address = this.dataRequest.address;
            this.user.gender = 'M';
        } else if ( this.dataRequest.name == 'RequestLogIn' ) {
            this.user.phone = this.dataRequest.phone;
        }

    }
    SignUp() {
        this.user.dob = this.user.dob.replace( /-/g, '' );
        this.userService.addNewUser( this.user ).subscribe( res => {
            this.dialogRef.close( {
                id: res, message: 'ok'
            });
        });

    }
    Cancel() {
        this.user.dob = this.user.dob.replace( /-/g, '' );
        this.user.password = '';
        this.userService.addNewUser( this.user ).subscribe( res => {
            this.dialogRef.close( { id: res, message: 'fail' });
        });
    }
    Login() {
        this.userService.login( this.user ).subscribe( res => {
            this.loginInfo = <LoginInfo>res;
            if ( this.loginInfo.message == '200' ) {
                this.cookieService.set( 'token', this.loginInfo.token );
                this.cookieService.set( 'name', this.loginInfo.name );
                this.cookieService.set( 'gender', this.loginInfo.gender );
                this.cookieService.set( 'itemInCart', this.loginInfo.itemInCart );
                this.dialogRef.close( { message: 'ok' });
            } else {
                this.message = 'Đăng nhập không thành công.'
            }
        });
    }
    CancelLogin() {
        this.dialogRef.close( { message: 'fail' });
    }
}
