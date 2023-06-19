import {Component, Input} from '@angular/core';
import {Order} from "../../models";
import {User} from "../../models/user.model";
import {OrderService} from "../../../order/services/order.service";
import {AuthService} from "../../../auth/services/auth.service";
import {Router} from "@angular/router";
import {RoutesEnum} from "../../enums/routes.enum";
import {DateUtils} from "../../utils/date-utils";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  @Input()
  order!: Order;

  createDate: string;
  paymentDate: string | undefined;
  user: User | undefined;

  constructor(
      private orderService: OrderService,
      private authService: AuthService,
      private router: Router,
  ) {
    this.createDate = '';
    this.paymentDate = undefined;
  }

  ngOnInit(): void {
    const date: Date = new Date(this.order.createDate!);

    this.createDate = DateUtils.formatDateToString(date);
    this.paymentDate = this.order.paymentDate ? DateUtils.formatDateToString(new Date(this.order.paymentDate!)) : undefined;

    this.authService.getAuthenticatedUser().subscribe({
      next: (authenticatedUser) => {
        this.user = authenticatedUser;
      },
      error: (err) => {
        console.log(err);
        this.user = undefined;
      },
    });
  }

  public setStatus(order: Order, status: string): void {
    this.orderService.setStatus(order.id!, status).subscribe(statusResponseDto => {
      this.order = statusResponseDto.entity!;
      this.paymentDate = this.order.paymentDate ? DateUtils.formatDateToString(new Date(this.order.paymentDate!)) : undefined;
    });
  }

  public showSummary(order: Order): void {
    this.router.navigate([RoutesEnum.ORDER_SUMMARY.replace(':id', order.id!.toString())])
  }
}
