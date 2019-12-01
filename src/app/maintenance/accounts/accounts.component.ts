import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/models/user';
import { UserService } from '../../shared/services/user.service'
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';
@Component( {
    selector: 'app-accounts',
    templateUrl: './accounts.component.html',
    styleUrls: ['./accounts.component.css'],
    providers: [UserService]
})
export class AccountsComponent implements OnInit {
    accounts: Array<User> = new Array();

    constructor( private userService: UserService, private cookieService: CookieService,private activatedRoute: ActivatedRoute, private router: Router ) { }

    ngOnInit() {
        this.userService.getPersons(this.cookieService.get('token')).subscribe(( res: Array<User>) => {
           this.accounts = res; 
        } );
    }
    navigatetoEditAccount(value){
        var url = 'user/edit/'+value;
        this.router.navigate([url]);
    }
   
}
