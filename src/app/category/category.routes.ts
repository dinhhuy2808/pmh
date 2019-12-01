import { Routes } from '@angular/router';
import { CategoryComponent } from './category.component'

export const CategoryRoutes: Routes = [
   {
       path:'category/:name/:page',component:CategoryComponent,pathMatch:'full'
   }
];