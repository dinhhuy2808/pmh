import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MaintenanceComponent } from './maintenance.component';
import { DatePipe } from '../shared/pipes/date-pipe';
@NgModule({
  declarations: [
    MaintenanceComponent
  ],
  imports: [
            BrowserModule,
            FormsModule,
            HttpClientModule,
            RouterModule,
  ],
  exports: [MaintenanceComponent],
  providers: []
})
export class MaintenanceModule {}
