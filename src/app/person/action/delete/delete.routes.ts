import { Routes } from '@angular/router';
import { DeleteComponent } from './delete.component';

export const DeleteRoutes: Routes = [
    {
        path: 'delete',
        component: DeleteComponent,
        pathMatch : 'full'
    },

];