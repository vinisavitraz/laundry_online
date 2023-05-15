import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OrderService} from "./services/order.service";
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { CreateOrderComponent } from './components/create-order/create-order.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { SearchOrderComponent } from './components/search-order/search-order.component';
import { ListOrdersComponent } from './components/list-orders/list-orders.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ClothingModule} from "../clothing/clothing.module";
import {RouterLink} from "@angular/router";

@NgModule({
  declarations: [
    OrderDetailComponent,
    CreateOrderComponent,
    OrderSummaryComponent,
    SearchOrderComponent,
    ListOrdersComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        ClothingModule,
        RouterLink,
    ],
  providers: [
      OrderService
  ],
})
export class OrderModule { }
