import { Routes } from '@angular/router';
import { LoginRoutes } from './login/login.routes'
import { RegisterRoutes } from './register/register.routes'
import { EditRoutes } from './edit/edit.routes'
import { UserComponent } from './user.component'

export const UserRoutes: Routes = [
   {
       path:'user',component:UserComponent,
        children: [
           ...LoginRoutes,
           ...RegisterRoutes,
           ...EditRoutes
       ]
   }
];