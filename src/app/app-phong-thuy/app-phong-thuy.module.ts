import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppPhongThuyComponent } from './app-phong-thuy.component';



@NgModule({
  declarations: [AppPhongThuyComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class AppPhongThuyModule { }
