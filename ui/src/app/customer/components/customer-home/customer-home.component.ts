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

  user: User | undefined;
  openOrders: Order[];

  constructor(
      private orderService: OrderService,
      private authService: AuthService,
      private router: Router,
  ) {
    this.user = undefined;
    this.openOrders = [];
  }

  ngOnInit(): void {
    this.authService.getAuthenticatedUser().subscribe({
      next: (authenticatedUserDto) => {
        this.user = authenticatedUserDto.entity;

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

    this.orderService.listOrdersByUserAndStatus(this.user, 'open').subscribe(responseDto => {
      this.openOrders = responseDto.entities ?? [];
    });
  }

  public setStatus(order: Order, status: string): void {
    this.orderService.setStatus(order.id!, status);
    this.listOpenOrders();
  }

  public showSummary(order: Order): void {
    this.router.navigate([RoutesEnum.ORDER_SUMMARY.replace(':id', order.id!.toString())])
  }
}
