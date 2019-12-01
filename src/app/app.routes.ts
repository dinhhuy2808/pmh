import { Routes } from '@angular/router';
import { PersonRoutes } from './person/person.routes'
import { UserRoutes } from './user/user.routes'
import { CategoryRoutes } from './category/category.routes'
import { ProductRoutes } from './product/product.routes'
import { PaymentRoutes } from './payment/payment.routes'
import { MaintenanceComponent } from './maintenance/maintenance.component'
import { VoucherComponent } from './maintenance/voucher/voucher.component'
import { AccountsComponent } from './maintenance/accounts/accounts.component'
import { CartComponent } from './cart/cart.component'
import { AppPhongThuyRoutes } from './app-phong-thuy/app-phong-thuy.routes'
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    ...UserRoutes,
    ...CategoryRoutes,
    ...ProductRoutes,
    ...PaymentRoutes,
    ...AppPhongThuyRoutes,
    {
        path:'',component: HomeComponent,pathMatch : 'full'
    },
    {
        path:'maintenance',component: MaintenanceComponent,pathMatch : 'full'
    },
    {
        path:'maintenance/voucher',component: VoucherComponent,pathMatch : 'full'
    },
    {
        path:'maintenance/accounts',component: AccountsComponent,pathMatch : 'full'
    },
    {
        path:'cart',component: CartComponent,pathMatch : 'full'
    }
];