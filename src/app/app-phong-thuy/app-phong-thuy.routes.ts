import { Routes } from '@angular/router';
import { AppPhongThuyComponent } from './app-phong-thuy.component';

export const AppPhongThuyRoutes: Routes = [
   {
       path:'app-phong-thuy',
       component: AppPhongThuyComponent,
       pathMatch:'full'
   },
   {
       path:'app-phong-thuy/:yearOfBirth',
       component: AppPhongThuyComponent,
   }
];