import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AddComponent } from './add.component';

@NgModule({
  declarations: [
    AddComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
   
  ],
  exports : [AddComponent],
  providers: [],
})
export class AddModule { }
