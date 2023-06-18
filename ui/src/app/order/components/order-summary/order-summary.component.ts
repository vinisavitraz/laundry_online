import { Component } from '@angular/core';
import {OrderService} from "../../services/order.service";
import {Order} from "../../../commons";
import {ActivatedRoute, Router} from "@angular/router";
import {RoutesEnum} from "../../../commons/enums/routes.enum";
import {OrderItem} from "../../../commons/models/order-item.model";

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent {
  order!: Order;
  totalProducts: number;

  constructor(
      private orderService: OrderService,
      private router: Router,
      private route: ActivatedRoute,
  ) {
    this.totalProducts = 0;
  }

  ngOnInit(): void {
    const id: number = +this.route.snapshot.params['id'];
    this.orderService.findById(id).subscribe(orderDto => {
      if (orderDto.entity === undefined) {
        throw new Error('Order not found. ID: ' + id);
      }

      this.order = orderDto.entity;

      for (let i = 0; i < orderDto.entity.items!.length; i++) {
        const item: OrderItem = orderDto.entity.items![i];
        this.totalProducts += item.totalQuantity ?? 0;
      }
    });
  }

  public setStatus(id: number | undefined, status: string): void {
    if (id === undefined) {
      return;
    }

    this.orderService.setStatus(id, status).subscribe(statusResponseDto => {
      this.router.navigate([RoutesEnum.LIST_ORDERS]);
    });
  }
}
