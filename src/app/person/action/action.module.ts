import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ActionComponent } from './action.component';
import { AddModule } from './add/add.module';
import { DeleteModule } from './delete/delete.module';
import { EditModule } from './edit/edit.module';

@NgModule({
  declarations: [
    ActionComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AddModule,
    DeleteModule,
    EditModule,
    RouterModule
  ],
  exports :[ActionComponent],
  providers: [],
})
export class ActionModule { }
