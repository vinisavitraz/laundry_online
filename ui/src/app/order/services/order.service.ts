import { Injectable } from '@angular/core';
import {Order} from "../../commons";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor() { }

  public listOpenOrders(userRole: string): Order[] {
    return [];
  }
}
