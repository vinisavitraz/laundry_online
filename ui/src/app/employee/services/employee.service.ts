import { Injectable } from '@angular/core';
import {Employee} from "../../commons/models/employee.model";
import {UserService} from "../../user/services/user.service";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
      private userService: UserService
  ) { }

  public getEmployees(): Employee[] {
    return this.userService.getEmployees();
  }

  public saveEmployee(employee: Employee): void {
    if (employee.id === undefined) {
      this.userService.registerEmployee(employee);
      return;
    }

    this.userService.updateEmployee(employee);
  }

  public findById(id: number): Employee | undefined {
    const employees: Employee[] = this.userService.getEmployees();

    return employees.find(employee => employee.id === id);
  }

  public remove(employee: Employee): void {
    this.userService.removeEmployee(employee);
  }
}
