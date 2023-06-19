import {Component, Input} from '@angular/core';
import {Order} from "../../models";
import {User} from "../../models/user.model";
import {OrderService} from "../../../order/services/order.service";
import {AuthService} from "../../../auth/services/auth.service";
import {Router} from "@angular/router";
import {RoutesEnum} from "../../enums/routes.enum";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  @Input()
  order!: Order;

  user: User | undefined;

  constructor(
      private orderService: OrderService,
      private authService: AuthService,
      private router: Router,
  ) {
  }

  ngOnInit(): void {
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
    });
  }

  public showSummary(order: Order): void {
    this.router.navigate([RoutesEnum.ORDER_SUMMARY.replace(':id', order.id!.toString())])
  }
}
