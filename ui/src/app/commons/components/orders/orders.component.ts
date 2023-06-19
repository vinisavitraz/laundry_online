import {Component, Input} from '@angular/core';
import {Order} from "../../index";
import {OrderService} from "../../../order/services/order.service";
import {AuthService} from "../../../auth/services/auth.service";
import {Router} from "@angular/router";
import {User} from "../../models/user.model";
import {RoutesEnum} from "../../enums/routes.enum";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {

  @Input()
  orders: Order[];

  constructor() {
    this.orders = [];
  }
}
