import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { LoginModule } from './login/login.module';
import { UserComponent } from './user.component';
import { RouterModule } from '@angular/router';
import { RegisterModule } from './register/register.module';
import { EditModule } from './edit/edit.module';

@NgModule({
  declarations: [
    UserComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    LoginModule,
    RegisterModule,
    HttpClientModule,
    RouterModule,
    EditModule
  ],
  providers: [CookieService],
  exports: [UserComponent],
})
export class UserModule { }
