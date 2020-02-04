import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/models/user';
import { FormBuilder, FormGroup } from "@angular/forms";
import { UserService } from '../../shared/services/user.service';
import {Router,ActivatedRoute} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [UserService]
})
export class EditComponent implements OnInit {
  isAdmin: boolean = false;
  user:User = new User();
  dob: string = '';
  isValidPhone: boolean = false;
phone: string = '';
  confirmPassword: string = '';
  constructor( private userService:UserService, private router : Router,private cookieService: CookieService , private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
      this.user.phone = this.activatedRoute.snapshot.paramMap.get( 'phone' );
      if (this.cookieService.check('token')) {
          this.userService.getPersonsByPhone(this.cookieService.get('token'), this.user.phone).subscribe((res:User) => {
              if(res == null){
                  this.router.navigate([`/`]);
              } else {
                  this.user = res;
                  this.user.password = '';
                  this.phone = this.user.phone;
                  var date = this.user.dob.toString();
                  var year = date.substring( 0, 4 )
                  var month = date.substring( 4, 6 )
                  var day = date.substring( 6, 8 )
                  this.user.dob = year + '-' + month + '-' + day;
              }
              this.userService.isAdmin(this.cookieService.get('token')).subscribe(res1 => {
                  if (res1 == true) {
                      this.isAdmin = true;
                  }
              });
            });
      } else {
          this.router.navigate([`/`]);
      }
      
      
  }
   checkUserByPhone() {
       if (this.phone != this.user.phone) {
           this.userService.checkUserByPhone(this.user.phone).subscribe(res => {
               if(res == false){
                   this.isValidPhone = false;
               } else {
                   this.isValidPhone = true;
               }
             });
       }
    
  }
   edit(){
       this.user.dob = this.user.dob.replace(/-/g, '');
       if (this.cookieService.check('token')){
           this.userService.editUser(this.user,this.cookieService.get('token')).subscribe(res => {
               if(res == '200'){
                  alert('Cập Nhật thành công.')
               }
             });
       }
       
   }

}
