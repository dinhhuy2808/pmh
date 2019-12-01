import { Routes } from '@angular/router';
import { AddComponent } from './add.component';

export const AddRoutes: Routes = [
    {
        path: 'add',
        component: AddComponent,
        pathMatch : 'full'
    },

];