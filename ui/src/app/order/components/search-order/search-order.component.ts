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
  user: User | undefined;
  orderId: string;
  notFound: boolean;

  constructor(
      private authService: AuthService,
      private orderService: OrderService,
      private router: Router,
  ) {
    this.user = undefined;
    this.orderId = '';
    this.notFound = false;
  }

  ngOnInit(): void {
    this.authService.getAuthenticatedUserOnWS().subscribe({
      next: (authenticatedUserDto) => {
        this.user = authenticatedUserDto.entity;
      },
      error: (err) => {
        console.log(err);
        this.user = undefined;
      },
    });
  }

  public searchOrder(): void {
    this.notFound = false;

    const orderId: number = Number(this.orderId);

    if (isNaN(orderId)) {
      return;
    }

    this.orderService.findById(orderId).subscribe(orderDto => {
      if (orderDto.entity === undefined) {
        this.notFound = true;
        return;
      }

      if (orderDto.entity!.customerId !== this.user!.id) {
        this.notFound = true;
        return;
      }

      this.order = orderDto.entity;
    });
  }

  public setStatus(order: Order, status: string): void {
    this.orderService.setStatus(order.id!, status).subscribe(dto => {
      if (dto.entity === undefined) {
        return;
      }

      this.order = dto.entity!;
    });
  }

  public showSummary(order: Order): void {
    this.router.navigate([RoutesEnum.ORDER_SUMMARY.replace(':id', order.id!.toString())])
  }
}
