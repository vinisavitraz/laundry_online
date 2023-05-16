import { Component } from '@angular/core';
import {Order} from "../../../commons";
import {OrderService} from "../../services/order.service";
import {RoutesEnum} from "../../../commons/enums/routes.enum";
import {Router} from "@angular/router";
import {User} from "../../../commons/models/user.model";
import {AuthService} from "../../../auth/services/auth.service";

@Component({
  selector: 'app-search-order',
  templateUrl: './search-order.component.html',
  styleUrls: ['./search-order.component.css']
})
export class SearchOrderComponent {
  order!: Order | undefined;
  user: User | null;
  orderId: string;
  notFound: boolean;

  constructor(
      private authService: AuthService,
      private orderService: OrderService,
      private router: Router,
  ) {
    this.user = null;
    this.orderId = '';
    this.notFound = false;
  }

  ngOnInit(): void {
    this.user = this.authService.getAuthenticatedUser();
  }

  public searchOrder(): void {
    this.notFound = false;

    const orderId: number = Number(this.orderId);

    if (isNaN(orderId)) {
      return;
    }

    console.log('search order'  + orderId);

    const order: Order | undefined = this.orderService.findById(orderId);

    console.log(order);
    if (order === undefined) {
      this.notFound = true;
      return;
    }

    console.log(order!.customerId);
    console.log(this.user!.id);
    if (order!.customerId !== this.user!.id) {
      this.notFound = true;
      return;
    }

    this.order = order;
  }

  public setStatus(order: Order, status: string): void {
    this.orderService.setStatus(order.id!, status);
    this.order = this.orderService.findById(order.id!);
  }

  public showSummary(order: Order): void {
    this.router.navigate([RoutesEnum.ORDER_SUMMARY.replace(':id', order.id!.toString())])
  }
}
