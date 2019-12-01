import { Routes } from '@angular/router';
import { DetailComponent } from './detail.component'
export const DetailRoutes: Routes = [
    {
        path: 'detail', component: DetailComponent
        , children: [
            {
                path: '',
                redirectTo: 'person',
                pathMatch: 'full'
            }
        ]
    }

];