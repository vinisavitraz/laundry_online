import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {CreateOrderRequestDto} from "../dto/request/create-order-request.dto";
import {User} from "../../commons/models/user.model";
import {RolesEnum} from "../../commons/enums/roles.enum";
import {AuthService} from "../../auth/services/auth.service";
import {HttpClient} from "@angular/common/http";
import {BASE_URL, DEFAULT_HEADERS} from "../../commons/constants/app-client.constants";
import {OrdersResponseDto} from "../dto/response/orders-response.dto";
import {CustomerService} from "../../customer/services/customer.service";
import {OrderResponseDto} from "../dto/response/order-response.dto";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
      private customerService: CustomerService,
      private authService: AuthService,
      private httpClient: HttpClient,
  ) { }

  public getOrdersByUser(user: User): Observable<OrdersResponseDto> {
    if (user.role === RolesEnum.EMPLOYEE) {
      return this.getOrders();
    }

    return this.httpClient.get<OrdersResponseDto>(
        BASE_URL + '/orders/customer/' + user.id, DEFAULT_HEADERS,
    );
  }

  public getOrdersByUserAndStatus(user: User, status: string): Observable<OrdersResponseDto> {
    return this.httpClient.get<OrdersResponseDto>(
        BASE_URL + '/orders/customer/' + user.id + '/status/' + status , DEFAULT_HEADERS,
    );
  }

  public getOrders(): Observable<OrdersResponseDto> {
    return this.httpClient.get<OrdersResponseDto>(
        BASE_URL + '/orders', DEFAULT_HEADERS,
    );
  }

  public createOrder(dto: CreateOrderRequestDto): Observable<OrderResponseDto> {
    return this.httpClient.post<OrderResponseDto>(
        BASE_URL + '/orders',
        dto,
        DEFAULT_HEADERS,
    );
  }


  public findById(id: number): Observable<OrderResponseDto> {
    return this.httpClient.get<OrderResponseDto>(
        BASE_URL + '/orders/' + id, DEFAULT_HEADERS
    );
  }

  public setStatus(id: number, status: string): Observable<OrderResponseDto> {
    return this.httpClient.put<OrderResponseDto>(
        BASE_URL + '/orders/' + id + '/status/' + status,
        DEFAULT_HEADERS
    );
  }
}
