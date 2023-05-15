import { Component } from '@angular/core';
import {Order} from "../../../commons";
import {OrderService} from "../../../order/services/order.service";
import {AuthService} from "../../../auth/services/auth.service";
import {User} from "../../../commons/models/user.model";

@Component({
  selector: 'app-customer-home',
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.css']
})
export class CustomerHomeComponent {

  openOrders: Order[];

  constructor(
      private orderService: OrderService,
      private authService: AuthService,
  ) {
    this.openOrders = [];
  }

  ngOnInit(): void {
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
