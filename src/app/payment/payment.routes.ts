import { Routes } from '@angular/router';
import { PaymentComponent } from './payment.component';
import { DetailComponent } from './detail/detail.component';
import { CheckoutComponent } from './checkout/checkout.component';

export const PaymentRoutes: Routes = [
    {
        path: 'payment/detail/:id',
        component: DetailComponent,
        pathMatch: 'full'
    },
    {
        path: 'payment/checkout',
        component: CheckoutComponent,
        pathMatch: 'full'
    },
    {
        path: 'payment',
        component: PaymentComponent,
        pathMatch: 'full'
    }
];