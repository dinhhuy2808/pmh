import { Routes } from '@angular/router';
import { PersonComponent } from './person.component';
import { ActionRoutes } from './action/action.routes';
import { DetailComponent } from './detail/detail.component';
import { HomeComponent } from './home/home.component';
import { DetailRoutes } from './detail/detail.routes';
import { AddComponent } from './action/add/add.component';

export const PersonRoutes: Routes = [
    {
        path: 'person',
        component: PersonComponent,
        children: [
            {
                path: '',
                component: HomeComponent,
                pathMatch: 'full'
            },
            {
                path: 'detail',
                component: DetailComponent,
                pathMatch: 'full'
            },
            ...ActionRoutes
        ]
    }
];