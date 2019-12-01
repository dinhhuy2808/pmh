import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PersonComponent } from './person.component';
import { DetailComponent } from './detail/detail.component';
import { DetailModule } from './detail/detail.module';
import { HomeModule } from './home/home.module';
import { ActionModule } from './action/action.module';
import { DatePipe } from '../shared/pipes/date-pipe';
import { AddComponent } from './action/add/add.component';
@NgModule({
  declarations: [
    PersonComponent
  ],
  imports: [
            BrowserModule,
            FormsModule,
            ActionModule,
            DetailModule,
            RouterModule,
            HomeModule
  ],
  exports: [PersonComponent],
  providers: []
})
export class PersonModule {}
