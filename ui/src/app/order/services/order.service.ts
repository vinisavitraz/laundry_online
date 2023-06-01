import { Injectable } from '@angular/core';
import {Order} from "../../commons";
import {Observable, of} from "rxjs";
import {CreateOrderRequestDto} from "../dto/request/create-order-request.dto";
import {OrderStatusEnum} from "../../commons/enums/order-status.enum";
import {ItemOrderRequestDto} from "../dto/request/item-order-request.dto";
import {OrderItem} from "../../commons/models/order-item.model";
import {User} from "../../commons/models/user.model";
import {RolesEnum} from "../../commons/enums/roles.enum";
import {UserService} from "../../user/services/user.service";
import {AuthService} from "../../auth/services/auth.service";
import {HttpClient} from "@angular/common/http";
import {ClothingsResponseDto} from "../../clothing/dto/response/clothings-response.dto";
import {BASE_URL, DEFAULT_HEADERS} from "../../commons/constants/app-client.constants";
import {OrdersResponseDto} from "../dto/response/orders-response.dto";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  static ORDERS_KEY = 'orders';

  constructor(
      private userService: UserService,
      private authService: AuthService,
      private httpClient: HttpClient,
  ) { }

  public listOrders(user: User): Order[] {
    const orders: Order[] = this.getOrders();

    if (user.role === RolesEnum.EMPLOYEE) {
      orders.sort(function (a, b) {
        const newDateA: Date = new Date(a.createDate!);
        const newDateB: Date = new Date(b.createDate!);
        // @ts-ignore
        return newDateA - newDateB;
      });

      return orders;
    }

    return orders
        .filter(function (order) {
          return order.customerId === user.id;
        })
        .sort(function (a, b) {
          const newDateA: Date = new Date(a.createDate!);
          const newDateB: Date = new Date(b.createDate!);
          // @ts-ignore
          return newDateB - newDateA;
        });
  }

  public listOrdersByUserAndStatus(user: User, status: string): Observable<OrdersResponseDto> {
    return this.httpClient.get<OrdersResponseDto>(
        BASE_URL + '/orders/user/' + user.id + '/status/' + status , DEFAULT_HEADERS,
    );
    // const orders: Order[] = this.getOrders();
    //
    //
    // if (user.role === RolesEnum.EMPLOYEE) {
    //   return orders.filter(order => {
    //     return order.status === OrderStatusEnum.OPEN
    //   })
    // }
    //
    // return orders.filter(order => {
    //   return order.customerId === user.id && order.status === OrderStatusEnum.OPEN
    // })
  }

  public getOrders(): Order[] {
    const ordersStorage: string | null = localStorage.getItem(OrderService.ORDERS_KEY);

    if (ordersStorage === null) {
      return [];
    }

    return JSON.parse(ordersStorage);
  }

  public createOrder(dto: CreateOrderRequestDto): Observable<Order | null> {
    const user: User | undefined = this.userService.findById(dto.customerId!);

    if (user === undefined) {
      return of(null);
    }

    const orders: Order[] = this.getOrders();
    const id: number = this.getNextId(orders);

    let totalWashPrice: number = 0;
    let totalWashTime: number = 0;
    const items: OrderItem[] = [];

    for (let i = 0; i < dto.items!.length!; i++) {
      const item: ItemOrderRequestDto = dto.items![i];

      const washPrice = item.clothing!.washPrice! * item.quantity!;
      totalWashPrice += washPrice;

      if (item.clothing!.washTime! > totalWashTime) {
        totalWashTime = item.clothing!.washTime!;
      }

      items.push(new OrderItem(item.clothing!.id, item.clothing!.name!, item.quantity!, washPrice));
    }

    const order: Order = new Order(
        id,
        OrderStatusEnum.CREATED,
        totalWashPrice,
        totalWashTime,
        items,
        user.id,
        user.name,
        new Date(),
    );

    orders.push(order);

    localStorage.setItem(OrderService.ORDERS_KEY, JSON.stringify(orders));

    return of(order);
  }

  private getNextId(orders: Order[] = []): number {
    if (orders.length === 0) {
      return 1;
    }

    let nextId: number = 0;

    orders.forEach(order => {
      if (order.id! > nextId) {
        nextId = order.id!;
      }
    });

    return nextId + 1;
  }

  public findById(id: number): Order | undefined {
    const orders: Order[] = this.getOrders();

    return orders.find(order => order.id === id);
  }

  public setStatus(id: number, status: string): void {
    const orders: Order[] = this.getOrders();

    for (let i = 0; i < orders.length!; i++) {
      const order: Order = orders[i];

      if (order.id === id) {
        order.status = status;
        orders[i] = order;
        break;
      }
    }

    localStorage.setItem(OrderService.ORDERS_KEY, JSON.stringify(orders));
  }
}
