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

  user: User | undefined;
  openOrders: Order[];

  constructor(
      private orderService: OrderService,
      private authService: AuthService,
  ) {
    this.user = undefined;
    this.openOrders = [];
  }

  ngOnInit(): void {
    this.authService.getAuthenticatedUser().subscribe({
      next: (authenticatedUser) => {
        this.user = authenticatedUser;

        this.listOpenOrders();
      },
      error: (err) => {
        console.log(err);
        this.user = undefined;
      },
    });
  }

  private listOpenOrders(): void {
    if (this.user === undefined) {
      return;
    }

    this.orderService.getOrdersByUserAndStatus(this.user, 'open').subscribe(responseDto => {
      this.openOrders = responseDto.entities ?? [];
    });
  }
}
