import { Component } from '@angular/core';
import {Order} from "../../../commons";
import {OrderService} from "../../services/order.service";
import {AuthService} from "../../../auth/services/auth.service";
import {User} from "../../../commons/models/user.model";
import {RoutesEnum} from "../../../commons/enums/routes.enum";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.css']
})
export class ListOrdersComponent {

  statusFilter: string;
  filtering: boolean;
  user: User | null;
  orders: Order[];
  allOrders: Order[];

  constructor(
      private authService: AuthService,
      private orderService: OrderService,
      private router: Router,
  ) {
    this.user = null;
    this.filtering = false;
    this.orders = [];
    this.allOrders = [];
    this.statusFilter = '';
  }

  ngOnInit(): void {
    this.user = this.authService.getAuthenticatedUser();
    this.orders = this.listOrders();
    this.allOrders = this.orders;
  }

  private listOrders(): Order[] {
    if (this.user === null) {
      return [];
    }

    return this.orderService.listOrders(this.user);
  }

  public setStatus(order: Order, status: string): void {
    this.orderService.setStatus(order.id!, status);
    this.orders = this.listOrders();
    this.allOrders = this.orders;
  }

  public showSummary(order: Order): void {
    this.router.navigate([RoutesEnum.ORDER_SUMMARY.replace(':id', order.id!.toString())])
  }

  public filterOrders(): void {
    if (this.statusFilter === '') {
      return;
    }

    this.filtering = true;
    this.orders = this.allOrders;

    this.orders = this.orders.filter(order => order.status === this.statusFilter);
  }

  public cancelFilter(): void {
    this.orders = this.allOrders;
    this.filtering = false;
    this.statusFilter = '';
  }
}
