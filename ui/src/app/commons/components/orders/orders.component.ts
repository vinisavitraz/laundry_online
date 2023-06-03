import {Component, Input} from '@angular/core';
import {Order} from "../../index";
import {OrderService} from "../../../order/services/order.service";
import {AuthService} from "../../../auth/services/auth.service";
import {Router} from "@angular/router";
import {User} from "../../models/user.model";
import {RoutesEnum} from "../../enums/routes.enum";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {

  @Input()
  orders: Order[];
  @Input()
  user: User | undefined;

  constructor(
      private orderService: OrderService,
      private authService: AuthService,
      private router: Router,
  ) {
    this.orders = [];
    this.user = undefined;
  }

  public setStatus(order: Order, status: string): void {
    this.orderService.setStatus(order.id!, status);
  }

  public showSummary(order: Order): void {
    this.router.navigate([RoutesEnum.ORDER_SUMMARY.replace(':id', order.id!.toString())])
  }
}
