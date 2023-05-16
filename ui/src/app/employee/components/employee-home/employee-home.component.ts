import { Component } from '@angular/core';
import {Order} from "../../../commons";
import {OrderService} from "../../../order/services/order.service";
import {AuthService} from "../../../auth/services/auth.service";
import {User} from "../../../commons/models/user.model";
import {OrderStatusEnum} from "../../../commons/enums/order-status.enum";
import {Router} from "@angular/router";
import {RoutesEnum} from "../../../commons/enums/routes.enum";

@Component({
  selector: 'app-employee-home',
  templateUrl: './employee-home.component.html',
  styleUrls: ['./employee-home.component.css']
})
export class EmployeeHomeComponent {

  user: User | null;
  openOrders: Order[];

  constructor(
      private orderService: OrderService,
      private authService: AuthService,
      private router: Router,
  ) {
    this.user = null;
    this.openOrders = [];
  }

  ngOnInit(): void {
    this.user = this.authService.getAuthenticatedUser();
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

  public setStatus(order: Order, status: string): void {
    this.orderService.setStatus(order.id!, status);
    this.openOrders = this.listOpenOrders();
  }

  public showSummary(order: Order): void {
    this.router.navigate([RoutesEnum.ORDER_SUMMARY.replace(':id', order.id!.toString())])
  }
}
