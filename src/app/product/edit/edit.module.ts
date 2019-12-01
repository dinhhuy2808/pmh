import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { EditComponent } from './edit.component';
import { RouterModule } from '@angular/router';

@NgModule( {
    declarations: [
        EditComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        RouterModule,
    ],
    providers: [CookieService],
    exports: [EditComponent],
})
export class EditModule { }
