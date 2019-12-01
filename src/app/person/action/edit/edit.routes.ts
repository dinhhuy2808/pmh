import { Routes } from '@angular/router';
import { EditComponent } from './edit.component';

export const EditRoutes: Routes = [
    {
        path: 'edit',
        component: EditComponent,
        pathMatch: 'full'
    },

];