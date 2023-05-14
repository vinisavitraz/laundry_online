import {Injectable} from '@angular/core';
import {RequestRegisterDto} from "../../auth/dto/request-register.dto";
import {Observable, of} from "rxjs";
import {Customer} from "../../commons/models/customer.model";
import {User} from "../../commons/models/user.model";
import {Employee} from "../../commons/models/employee.model";
import {RolesEnum} from "../../commons/enums/roles.enum";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  static USERS_KEY = 'users';
  constructor() { }

  public registerCustomer(dto: RequestRegisterDto): Observable<Customer> {
    const password: string = '';
    const users: User[] = this.getUsers();

    if (users.length === 0) {
      const customer: Customer = this.buildCustomerFromDto(1, dto, password);
      const user: User = this.buildUserFromRole(customer, RolesEnum.CUSTOMER);

      localStorage.setItem(UserService.USERS_KEY, JSON.stringify([user]));

      return of(customer);
    }

    let id: number = this.getNextId(users);
    const customer: Customer = this.buildCustomerFromDto(id, dto, password);
    const user: User = this.buildUserFromRole(customer, RolesEnum.CUSTOMER);

    //validate email
    users.push(user);

    localStorage.setItem(UserService.USERS_KEY, JSON.stringify(users));

    return of(customer);
  }

  public findUserByEmail(email: string): User | undefined {
    const users: User[] = this.getUsers();

    return users.find(user => user.email === email);
  }

  private getUsers(): User[] {
    const usersStorage: string | null = localStorage.getItem(UserService.USERS_KEY);

    if (usersStorage === null) {
      return [];
    }

    return JSON.parse(usersStorage);
  }

  private getNextId(users: User[] = []): number {
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

  private buildUserFromRole(customer: Customer | Employee, role: RolesEnum): User {
    return new User(
        customer.id,
        customer.name,
        customer.email,
        role,
    );
  }
}
