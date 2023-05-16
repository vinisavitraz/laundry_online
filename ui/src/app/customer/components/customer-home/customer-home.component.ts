import { Component } from '@angular/core';
import {Order} from "../../../commons";
import {OrderService} from "../../../order/services/order.service";
import {AuthService} from "../../../auth/services/auth.service";
import {User} from "../../../commons/models/user.model";
import {RoutesEnum} from "../../../commons/enums/routes.enum";
import {Router} from "@angular/router";

@Component({
  selector: 'app-customer-home',
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.css']
})
export class CustomerHomeComponent {

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

  private listOpenOrders(): Order[] {
    if (this.user === null) {
      return [];
    }

    return this.orderService.listOpenOrders(this.user);
  }

  public setStatus(order: Order, status: string): void {
    this.orderService.setStatus(order.id!, status);
    this.openOrders = this.listOpenOrders();
  }

  public showSummary(order: Order): void {
    this.router.navigate([RoutesEnum.ORDER_SUMMARY.replace(':id', order.id!.toString())])
  }
}
