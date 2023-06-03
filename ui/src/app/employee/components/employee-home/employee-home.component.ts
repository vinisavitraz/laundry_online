import { Component } from '@angular/core';
import {Order} from "../../../commons";
import {OrderService} from "../../../order/services/order.service";

@Component({
  selector: 'app-employee-home',
  templateUrl: './employee-home.component.html',
  styleUrls: ['./employee-home.component.css']
})
export class EmployeeHomeComponent {

  openOrders: Order[];

  constructor(
      private orderService: OrderService,
  ) {
    this.openOrders = [];
  }

  ngOnInit(): void {
    this.listOpenOrders();
  }

  private listOpenOrders(): void {
    this.orderService.getOrdersByStatus('open').subscribe(responseDto => {
      this.openOrders = responseDto.entities ?? [];
    });
  }
}
