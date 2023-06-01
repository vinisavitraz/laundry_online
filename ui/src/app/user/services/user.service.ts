import {Injectable} from '@angular/core';
import {RequestRegisterDto} from "../../auth/dto/request/request-register.dto";
import {Observable, of} from "rxjs";
import {Customer} from "../../commons/models/customer.model";
import {User} from "../../commons/models/user.model";
import {Employee} from "../../commons/models/employee.model";
import {RolesEnum} from "../../commons/enums/roles.enum";
import {RegisterResponseDto} from "../../auth/dto/response/register-response.dto";
import {ClothingsResponseDto} from "../../clothing/dto/response/clothings-response.dto";
import {BASE_URL, DEFAULT_HEADERS} from "../../commons/constants/app-client.constants";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  static USERS_KEY = 'users';
  static CUSTOMERS_KEY = 'customers';
  static EMPLOYEES_KEY = 'employees';

  constructor(private httpClient: HttpClient) { }

  public registerCustomer(dto: RequestRegisterDto): Observable<RegisterResponseDto> {
    // try {
    //   this.validateRequestRegister(dto);
    // } catch (error) {
    //   // @ts-ignore
    // }


    const password: string = '';
    const users: User[] = this.getUsers();

    if (users.length === 0) {
      const user: User = this.buildUserFromRole(1, dto.name!, dto.email!, RolesEnum.CUSTOMER);
      const customer: Customer = this.buildCustomerFromDto(user.id!, dto, password);

      localStorage.setItem(UserService.USERS_KEY, JSON.stringify([user]));
      localStorage.setItem(UserService.CUSTOMERS_KEY, JSON.stringify([customer]));

      return of(new RegisterResponseDto(customer));
    }

    const customers: Customer[] = this.getCustomers();

    let id: number = this.getUserNextId(users);
    const user: User = this.buildUserFromRole(id, dto.name!, dto.email!, RolesEnum.CUSTOMER);
    const customer: Customer = this.buildCustomerFromDto(user.id!, dto, password);

    //validate email
    users.push(user);
    customers.push(customer);

    localStorage.setItem(UserService.USERS_KEY, JSON.stringify(users));
    localStorage.setItem(UserService.CUSTOMERS_KEY, JSON.stringify(customers));

    return of(new RegisterResponseDto(customer));
  }

  public registerEmployee(employee: Employee): Observable<Employee> {
    const users: User[] = this.getUsers();

    if (users.length === 0) {
      const user: User = this.buildUserFromRole(1, employee.name!, employee.email!, RolesEnum.EMPLOYEE);
      employee.id = user.id;

      localStorage.setItem(UserService.USERS_KEY, JSON.stringify([user]));
      localStorage.setItem(UserService.EMPLOYEES_KEY, JSON.stringify([employee]));

      return of(employee);
    }

    const employees: Employee[] = this.getEmployees();

    let id: number = this.getUserNextId(users);
    const user: User = this.buildUserFromRole(id, employee.name!, employee.email!, RolesEnum.EMPLOYEE);
    employee.id = user.id;

    //validate email
    users.push(user);
    employees.push(employee);

    localStorage.setItem(UserService.USERS_KEY, JSON.stringify(users));
    localStorage.setItem(UserService.EMPLOYEES_KEY, JSON.stringify(employees));

    return of(employee);
  }

  public updateEmployee(employee: Employee): void {
    const employees: Employee[] = this.getEmployees();
    let index: number = employees.findIndex(employeeArray => employeeArray.id === employee.id);
    employees[index] = employee;

    localStorage.setItem(UserService.EMPLOYEES_KEY, JSON.stringify(employees));
  }

  public findById(id: number): User | undefined {
    const users: User[] = this.getUsers();

    return users.find(user => user.id === id);
  }

  public getUsers(): User[] {
    const usersStorage: string | null = localStorage.getItem(UserService.USERS_KEY);

    if (usersStorage === null) {
      return [];
    }

    return JSON.parse(usersStorage);
  }

  public getCustomers(): Customer[] {
    const customersStorage: string | null = localStorage.getItem(UserService.CUSTOMERS_KEY);

    if (customersStorage === null) {
      return [];
    }

    return JSON.parse(customersStorage);
  }

  public getEmployees(): Employee[] {
    const employeesStorage: string | null = localStorage.getItem(UserService.EMPLOYEES_KEY);

    if (employeesStorage === null) {
      return [];
    }

    return JSON.parse(employeesStorage);
  }

  private getUserNextId(users: User[] = []): number {
    if (users.length === 0) {
      return 1;
    }

    let nextId: number = 0;

    users.forEach(user => {
      if (user.id! > nextId) {
        nextId = user.id! + 1;
      }
    });

    return nextId;
  }

  private buildCustomerFromDto(
      id: number,
      dto: RequestRegisterDto,
      password: string,
  ): Customer {
    return new Customer(
        id,
        dto.name,
        dto.email,
        password,
        dto.document,
        dto.phone,
        dto.cep,
        dto.street,
        dto.streetNumber,
        dto.district,
        dto.city,
        dto.state,
    );
  }

  private buildUserFromRole(id: number, name: string, email: string, role: RolesEnum): User {
    return new User(
        id,
        name,
        email,
        role,
    );
  }

}
