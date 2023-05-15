import { Component } from '@angular/core';
import {Order} from "../../../commons";
import {OrderService} from "../../services/order.service";
import {RolesEnum} from "../../../commons/enums/roles.enum";
import {AuthService} from "../../../auth/services/auth.service";
import {User} from "../../../commons/models/user.model";
import {RoutesEnum} from "../../../commons/enums/routes.enum";

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.css']
})
export class ListOrdersComponent {

  orders: Order[];

  constructor(
      private authService: AuthService,
      private orderService: OrderService,
  ) {
    this.orders = [];
  }

  ngOnInit(): void {
    this.orders = this.listOrders();
  }

  private listOrders(): Order[] {
    const user: User | null = this.authService.getAuthenticatedUser();

    if (user === null) {
      return [];
    }

    return this.orderService.listOrders(user);
  }

  public setStatus(order: Order, status: string): void {
    this.orderService.setStatus(order.id!, status);
    this.orders = this.listOrders();
  }
}
