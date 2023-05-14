import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OrderService} from "./services/order.service";
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { CreateOrderComponent } from './components/create-order/create-order.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { SearchOrderComponent } from './components/search-order/search-order.component';

@NgModule({
  declarations: [
    OrderDetailComponent,
    CreateOrderComponent,
    OrderSummaryComponent,
    SearchOrderComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
      OrderService
  ],
})
export class OrderModule { }
