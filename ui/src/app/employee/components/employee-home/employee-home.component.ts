import { Component } from '@angular/core';
import {Order} from "../../../commons";
import {OrderService} from "../../../order/services/order.service";
import {RolesEnum} from "../../../commons/enums/roles.enum";

@Component({
  selector: 'app-employee-home',
  templateUrl: './employee-home.component.html',
  styleUrls: ['./employee-home.component.css']
})
export class EmployeeHomeComponent {

  openOrders: Order[];

  constructor(private orderService: OrderService) {
    this.openOrders = [];
  }

  ngOnInit(): void {
    this.openOrders = this.listOpenOrders();
  }

  private listOpenOrders(): Order[] {
    return this.orderService.listOpenOrders(RolesEnum.EMPLOYEE);
  }
}
