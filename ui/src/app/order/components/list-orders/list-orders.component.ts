import { Component } from '@angular/core';
import {Order} from "../../../commons";
import {OrderService} from "../../services/order.service";
import {AuthService} from "../../../auth/services/auth.service";
import {User} from "../../../commons/models/user.model";

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.css']
})
export class ListOrdersComponent {

  statusFilter: string;
  filtering: boolean;
  user: User | undefined;
  orders: Order[];
  allOrders: Order[];

  constructor(
      private authService: AuthService,
      private orderService: OrderService,
  ) {
    this.user = undefined;
    this.filtering = false;
    this.orders = [];
    this.allOrders = [];
    this.statusFilter = '';
  }

  ngOnInit(): void {
    this.authService.getAuthenticatedUserOnWS().subscribe({
      next: (authenticatedUserDto) => {
        this.user = authenticatedUserDto.entity;
        this.listOrders();
      },
      error: (err) => {
        console.log(err);
        this.user = undefined;
      },
    });
  }

  private listOrders(): void {
    if (this.user === undefined) {
      return;
    }

    this.orderService.getOrdersByUser(this.user).subscribe(ordersDto => {
      if (!ordersDto.entities) {
        return;
      }

      this.orders = ordersDto.entities!;
      console.log(this.orders);
      this.allOrders = ordersDto.entities!;
    });
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
