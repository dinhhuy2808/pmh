import { Routes } from '@angular/router';
import { ActionComponent } from './action.component';
import { AddRoutes } from './add/add.routes';
import { DeleteRoutes } from './delete/delete.routes';
import { EditRoutes } from './edit/edit.routes';

export const ActionRoutes: Routes = [
    {
        path: 'action',
        component: ActionComponent,
        children: [
            ...AddRoutes,
            ...DeleteRoutes,
            ...EditRoutes
        ]
    },

];