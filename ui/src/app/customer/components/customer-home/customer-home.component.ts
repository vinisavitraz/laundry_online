import { Component } from '@angular/core';
import {Order} from "../../../commons";
import {OrderService} from "../../../order/services/order.service";
import {RolesEnum} from "../../../commons/enums/roles.enum";

@Component({
  selector: 'app-customer-home',
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.css']
})
export class CustomerHomeComponent {

  openOrders: Order[];

  constructor(private orderService: OrderService) {
    this.openOrders = [];
  }

  ngOnInit(): void {
    this.openOrders = this.listOpenOrders();
  }

  private listOpenOrders(): Order[] {
    return this.orderService.listOpenOrders(RolesEnum.CUSTOMER);
  }

}
