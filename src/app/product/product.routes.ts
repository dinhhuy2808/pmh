import { Routes } from '@angular/router';
import { DetailComponent } from './detail/detail.component'
import { AddRoutes } from './add/add.routes'
import { EditRoutes } from './edit/edit.routes'
import { ProductComponent } from './product.component'


export const ProductRoutes: Routes = [
    {
        path: 'product', component: ProductComponent,
        children: [
                   {
                       path: 'detail/:name', component: DetailComponent,pathMatch:'full'
                   },
           ...AddRoutes,
           ...EditRoutes
        ]
    }
];