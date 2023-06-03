import {Component, Input} from '@angular/core';
import {Order} from "../../models";
import {User} from "../../models/user.model";
import {OrderService} from "../../../order/services/order.service";
import {AuthService} from "../../../auth/services/auth.service";
import {Router} from "@angular/router";
import {RoutesEnum} from "../../enums/routes.enum";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  @Input()
  order: Order | undefined;
  @Input()
  user: User | undefined;

  constructor(
      private orderService: OrderService,
      private authService: AuthService,
      private router: Router,
  ) {
  }

  public setStatus(order: Order, status: string): void {
    this.orderService.setStatus(order.id!, status);
  }

  public showSummary(order: Order): void {
    this.router.navigate([RoutesEnum.ORDER_SUMMARY.replace(':id', order.id!.toString())])
  }
}
