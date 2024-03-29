import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AuthModule} from "./auth/auth.module";
import {CustomerModule} from "./customer/customer.module";
import {OrderModule} from "./order/order.module";
import {CommonsModule} from "./commons";
import {ClothingModule} from "./clothing/clothing.module";
import {EmployeeModule} from "./employee/employee.module";
import {HttpClientModule} from "@angular/common/http";
import {ReportModule} from "./report/report.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    AuthModule,
    CustomerModule,
    OrderModule,
    CommonsModule,
    ClothingModule,
    EmployeeModule,
    HttpClientModule,
    ReportModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
