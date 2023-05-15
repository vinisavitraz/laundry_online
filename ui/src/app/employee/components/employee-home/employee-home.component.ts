import { Component } from '@angular/core';
import {Order} from "../../../commons";
import {OrderService} from "../../../order/services/order.service";
import {RolesEnum} from "../../../commons/enums/roles.enum";
import {AuthService} from "../../../auth/services/auth.service";
import {User} from "../../../commons/models/user.model";
import {OrderStatusEnum} from "../../../commons/enums/order-status.enum";
import {RoutesEnum} from "../../../commons/enums/routes.enum";
import {Router} from "@angular/router";

@Component({
  selector: 'app-employee-home',
  templateUrl: './employee-home.component.html',
  styleUrls: ['./employee-home.component.css']
})
export class EmployeeHomeComponent {

  openOrders: Order[];

  constructor(
      private orderService: OrderService,
      private authService: AuthService,
      private router: Router,
  ) {
    this.openOrders = [];
  }

  ngOnInit(): void {
    this.openOrders = this.listOpenOrders();
  }

  public setCollected(order: Order): void {
    this.orderService.setStatus(order.id!, OrderStatusEnum.COLLECTED);
    this.openOrders = this.listOpenOrders();
  }

  private listOpenOrders(): Order[] {
    const user: User | null = this.authService.getAuthenticatedUser();

    if (user === null) {
      return [];
    }

    return this.orderService.listOpenOrders(user);
  }
}
