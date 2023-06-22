import {Component, ElementRef, ViewChild} from '@angular/core';
import {Order} from "../../../commons";
import {OrderService} from "../../services/order.service";
import {AuthService} from "../../../auth/services/auth.service";
import {User} from "../../../commons/models/user.model";

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.css']
})
export class ListOrdersComponent {

  statusFilter: string;
  filtering: boolean;
  user: User | undefined;
  orders: Order[];
  allOrders: Order[];

  filterAllOrders: boolean;
  filterPeriodOrders: boolean;
  filterTodayOrders: boolean;

  startDate?: string;
  endDate?: string;

  @ViewChild('todayButton', { read: ElementRef, static:false }) buttonToday!: ElementRef;
  @ViewChild('todayPeriod', { read: ElementRef, static:false }) buttonPeriod!: ElementRef;
  @ViewChild('todayAll', { read: ElementRef, static:false }) buttonAll!: ElementRef;

  constructor(
      private authService: AuthService,
      private orderService: OrderService,
  ) {
    this.user = undefined;
    this.filtering = false;
    this.orders = [];
    this.allOrders = [];
    this.statusFilter = '';
    this.filterAllOrders = true;
    this.filterPeriodOrders = false;
    this.filterTodayOrders = false;
  }

  ngOnInit(): void {
    this.authService.getAuthenticatedUserOnWS().subscribe({
      next: (authenticatedUserDto) => {
        this.user = authenticatedUserDto.entity;
        this.listOrders();
      },
      error: (err) => {
        console.log(err);
        this.user = undefined;
      },
    });
  }

  public filterToday(): void {
    this.orders = this.allOrders;

    this.filterTodayOrders = true;
    this.filterPeriodOrders = false;
    this.filterAllOrders = false;

    this.buttonToday.nativeElement.classList.remove('btn', 'btn-outline-secondary');
    this.buttonToday.nativeElement.classList.add('btn', 'btn-secondary');

    this.buttonPeriod.nativeElement.classList.remove('btn', 'btn-secondary');
    this.buttonPeriod.nativeElement.classList.remove('btn', 'btn-outline-secondary');
    this.buttonPeriod.nativeElement.classList.add('btn', 'btn-outline-secondary');

    this.buttonAll.nativeElement.classList.remove('btn', 'btn-secondary');
    this.buttonAll.nativeElement.classList.remove('btn', 'btn-outline-secondary');
    this.buttonAll.nativeElement.classList.add('btn', 'btn-outline-secondary');

    const today: Date = new Date();

    this.orders = this.orders.filter(order => {
      const orderCreateDate: Date = new Date(order.createDate!);
      orderCreateDate.setHours(0, 0, 0);

      return this.compareDatesEquals(today, orderCreateDate);
    });
  }

  public filterPeriod(): void {
    this.orders = this.allOrders;

    this.filterTodayOrders = false;
    this.filterPeriodOrders = true;
    this.filterAllOrders = false;

    this.buttonPeriod.nativeElement.classList.remove('btn', 'btn-outline-secondary');
    this.buttonPeriod.nativeElement.classList.add('btn', 'btn-secondary');

    this.buttonToday.nativeElement.classList.remove('btn', 'btn-secondary');
    this.buttonToday.nativeElement.classList.remove('btn', 'btn-outline-secondary');
    this.buttonToday.nativeElement.classList.add('btn', 'btn-outline-secondary');

    this.buttonAll.nativeElement.classList.remove('btn', 'btn-secondary');
    this.buttonAll.nativeElement.classList.remove('btn', 'btn-outline-secondary');
    this.buttonAll.nativeElement.classList.add('btn', 'btn-outline-secondary');
  }

  public filterAll(): void {
    this.orders = this.allOrders;

    this.filterTodayOrders = false;
    this.filterPeriodOrders = false;
    this.filterAllOrders = true;

    this.buttonAll.nativeElement.classList.remove('btn', 'btn-outline-secondary');
    this.buttonAll.nativeElement.classList.add('btn', 'btn-secondary');

    this.buttonToday.nativeElement.classList.remove('btn', 'btn-secondary');
    this.buttonToday.nativeElement.classList.remove('btn', 'btn-outline-secondary');
    this.buttonToday.nativeElement.classList.add('btn', 'btn-outline-secondary');

    this.buttonPeriod.nativeElement.classList.remove('btn', 'btn-secondary');
    this.buttonPeriod.nativeElement.classList.remove('btn', 'btn-outline-secondary');
    this.buttonPeriod.nativeElement.classList.add('btn', 'btn-outline-secondary');
  }

  public setInitialDate($event: any): void {
    this.orders = this.allOrders;

    if (this.endDate === undefined) {
      this.orders = this.orders.filter(order => {
        const orderCreateDate: Date = new Date(order.createDate!);

        return this.compareDatesEqualsOrLess(new Date($event), orderCreateDate);
      });
      return;
    }

    const end: Date = new Date(this.endDate);

    this.orders = this.orders.filter(order => {
      const orderCreateDate: Date = new Date(order.createDate!);

      return this.compareDatesEqualsOrLess(new Date($event), orderCreateDate);
    });
    this.orders = this.orders.filter(order => {
      const orderCreateDate: Date = new Date(order.createDate!);

      return this.compareDatesEqualsOrGreater(end, orderCreateDate);
    });
  }

  public setEndDate($event: any): void {
    this.orders = this.allOrders;

    if (this.startDate === undefined) {
      this.orders = this.orders.filter(order => {
        const orderCreateDate: Date = new Date(order.createDate!);

        return this.compareDatesEqualsOrGreater(new Date($event), orderCreateDate);
      });
      return;
    }

    const start: Date = new Date(this.startDate);

    this.orders = this.orders.filter(order => {
      const orderCreateDate: Date = new Date(order.createDate!);

      return this.compareDatesEqualsOrLess(start, orderCreateDate);
    });
    this.orders = this.orders.filter(order => {
      const orderCreateDate: Date = new Date(order.createDate!);

      return this.compareDatesEqualsOrGreater(new Date($event), orderCreateDate);
    });
  }

  private listOrders(): void {
    if (this.user === undefined) {
      return;
    }

    this.orderService.getOrdersByUser(this.user).subscribe(ordersDto => {
      if (!ordersDto.entities) {
        return;
      }

      this.orders = ordersDto.entities!;
      this.allOrders = ordersDto.entities!;
    });
  }

  public filterOrders(): void {
    if (this.statusFilter === '') {
      return;
    }

    this.filtering = true;
    this.orders = this.allOrders;

    this.orders = this.orders.filter(order => order.status === this.statusFilter);
  }

  public cancelFilter(): void {
    this.orders = this.allOrders;
    this.filtering = false;
    this.statusFilter = '';
  }

  private compareDatesEquals(date1: Date, date2: Date): boolean {
    date1.setHours(0, 0, 0, 0);
    date2.setHours(0, 0, 0, 0);

    return date1.getTime() === date2.getTime();
  }

  private compareDatesEqualsOrGreater(date1: Date, date2: Date): boolean {
    date1.setHours(0, 0, 0, 0);
    date2.setHours(0, 0, 0, 0);

    console.log(date1);
    console.log(date2);

    return date1.getTime() >= date2.getTime();
  }

  private compareDatesEqualsOrLess(date1: Date, date2: Date): boolean {
    date1.setHours(0, 0, 0, 0);
    date2.setHours(0, 0, 0, 0);

    console.log(date1);
    console.log(date2);

    return date1.getTime() <= date2.getTime();
  }


}
