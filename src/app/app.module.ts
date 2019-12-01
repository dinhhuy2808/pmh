import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { AppComponent } from './app.component';
import { PersonModule } from './person/person.module';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { DetailComponent } from './product/detail/detail.component';
import { PaymentModule } from './payment/payment.module';
import { AppPhongThuyModule } from './app-phong-thuy/app-phong-thuy.module';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { VoucherComponent } from './maintenance/voucher/voucher.component';
import { AccountsComponent } from './maintenance/accounts/accounts.component';
import { CartComponent } from './cart/cart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    MaintenanceComponent,
    DetailComponent,
    CartComponent,
    VoucherComponent,
    HomeComponent,
    AccountsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    PersonModule,
    UserModule,
    CategoryModule,
    ProductModule,
    PaymentModule,
    AppPhongThuyModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { useHash: true }),
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [CookieService, DeviceDetectorService],
  exports: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
