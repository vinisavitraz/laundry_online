import { NgModule } from '@angular/core';
import { OnlyNumbersDirective } from './directives';
import { NavbarComponent } from './components/navbar/navbar.component';
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {OrdersComponent} from "./components/orders/orders.component";
import { OrderComponent } from './components/order/order.component';

@NgModule({
  declarations: [
    OnlyNumbersDirective,
    NavbarComponent,
    OrdersComponent,
    OrderComponent,
  ],
    exports: [
        OnlyNumbersDirective,
        NavbarComponent,
        OrdersComponent,
        OrderComponent,
    ],
  imports: [
    CommonModule,
    RouterModule,
  ],
})
export class CommonsModule { }
