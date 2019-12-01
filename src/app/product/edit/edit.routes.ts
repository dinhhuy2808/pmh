import { Routes } from '@angular/router';
import { EditComponent } from './edit.component'

export const EditRoutes: Routes = [
    {
        path: 'edit/:name', component: EditComponent, pathMatch: 'full',
    }
];