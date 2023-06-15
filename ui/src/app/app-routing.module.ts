import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RoutesEnum} from "./commons/enums/routes.enum";
import {LoginComponent} from "./auth/components/login/login.component";
import {RegisterComponent} from "./auth/components/register/register.component";
import {OrderDetailComponent} from "./order/components/order-detail/order-detail.component";
import {ListClothingsComponent} from "./clothing/components/list-clothings/list-clothings.component";
import {CreateClothingComponent} from "./clothing/components/create-clothing/create-clothing.component";
import {EditClothingComponent} from "./clothing/components/edit-clothing/edit-clothing.component";
import {CustomerHomeComponent} from "./customer/components/customer-home/customer-home.component";
import {EmployeeHomeComponent} from "./employee/components/employee-home/employee-home.component";
import {CreateOrderComponent} from "./order/components/create-order/create-order.component";
import {OrderSummaryComponent} from "./order/components/order-summary/order-summary.component";
import {SearchOrderComponent} from "./order/components/search-order/search-order.component";
import {AuthGuard} from "./auth/guards/auth.guard";
import {RolesEnum} from "./commons/enums/roles.enum";
import {ListOrdersComponent} from "./order/components/list-orders/list-orders.component";
import {ListEmployeesComponent} from "./employee/components/list-employees/list-employees.component";
import {CreateEmployeeComponent} from "./employee/components/create-employee/create-employee.component";
import {EditEmployeeComponent} from "./employee/components/edit-employee/edit-employee.component";
import {SelectReportComponent} from "./report/components/select-report/select-report.component";
import {AppComponent} from "./app.component";

const routes: Routes = [
  {
    path: RoutesEnum.HOME,
    component: AppComponent,
  },
  {
    path: RoutesEnum.LOGIN,
    component: LoginComponent,
  },
  {
    path: RoutesEnum.REGISTER,
    component: RegisterComponent,
  },
  {
    path: RoutesEnum.CUSTOMER_HOME,
    component: CustomerHomeComponent,
    canActivate: [AuthGuard],
    data: {
      role: [
          RolesEnum.CUSTOMER
      ],
    },
  },
  {
    path: RoutesEnum.EMPLOYEE_HOME,
    component: EmployeeHomeComponent,
    canActivate: [AuthGuard],
    data: {
      role: [
        RolesEnum.EMPLOYEE
      ],
    },
  },
  {
    path: RoutesEnum.CREATE_ORDER,
    component: CreateOrderComponent,
    canActivate: [AuthGuard],
    data: {
      role: [
        RolesEnum.CUSTOMER
      ],
    },
  },
  {
    path: RoutesEnum.ORDER_SUMMARY,
    component: OrderSummaryComponent,
    canActivate: [AuthGuard],
    data: {
      role: [
        RolesEnum.CUSTOMER
      ],
    },
  },
  {
    path: RoutesEnum.LIST_ORDERS,
    component: ListOrdersComponent,
  },
  {
    path: RoutesEnum.SEARCH_ORDER,
    component: SearchOrderComponent,
  },
  {
    path: RoutesEnum.ORDER_DETAIL,
    component: OrderDetailComponent,
  },
  {
    path: RoutesEnum.LIST_CLOTHINGS,
    component: ListClothingsComponent,
    canActivate: [AuthGuard],
    data: {
      role: [
        RolesEnum.EMPLOYEE
      ],
    },
  },
  {
    path: RoutesEnum.CREATE_CLOTHING,
    component: CreateClothingComponent,
    canActivate: [AuthGuard],
    data: {
      role: [
        RolesEnum.EMPLOYEE
      ],
    },
  },
  {
    path: RoutesEnum.EDIT_CLOTHING,
    component: EditClothingComponent,
    canActivate: [AuthGuard],
    data: {
      role: [
        RolesEnum.EMPLOYEE
      ],
    },
  },
  {
    path: RoutesEnum.LIST_EMPLOYEES,
    component: ListEmployeesComponent,
    canActivate: [AuthGuard],
    data: {
      role: [
        RolesEnum.EMPLOYEE
      ],
    },
  },
  {
    path: RoutesEnum.CREATE_EMPLOYEE,
    component: CreateEmployeeComponent,
    canActivate: [AuthGuard],
    data: {
      role: [
        RolesEnum.EMPLOYEE
      ],
    },
  },
  {
    path: RoutesEnum.EDIT_EMPLOYEE,
    component: EditEmployeeComponent,
    canActivate: [AuthGuard],
    data: {
      role: [
        RolesEnum.EMPLOYEE
      ],
    },
  },
  {
    path: RoutesEnum.SELECT_REPORT,
    component: SelectReportComponent,
    canActivate: [AuthGuard],
    data: {
      role: [
        RolesEnum.EMPLOYEE
      ],
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
