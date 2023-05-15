import { Component } from '@angular/core';
import {OrderService} from "../../services/order.service";
import {Order} from "../../../commons";
import {ActivatedRoute, Router} from "@angular/router";
import {RoutesEnum} from "../../../commons/enums/routes.enum";

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent {
  order!: Order;

  constructor(
      private orderService: OrderService,
      private router: Router,
      private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const id: number = +this.route.snapshot.params['id'];
    const order: Order | undefined = this.orderService.findById(id);

    if (order === undefined) {
      throw new Error('Order not found. ID: ' + id);
    }

    this.order = order;
  }

  public setStatus(id: number, status: string): void {
    this.orderService.setStatus(id, status);
    this.router.navigate([RoutesEnum.LIST_ORDERS]);
  }
}
