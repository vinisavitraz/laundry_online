import { Component } from '@angular/core';
import {Employee} from "../../../commons/models/employee.model";
import {EmployeeService} from "../../services/employee.service";
import {AuthService} from "../../../auth/services/auth.service";
import {User} from "../../../commons/models/user.model";

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent {

  employees: Employee[];
  user: User | undefined;

  constructor(private employeeService: EmployeeService, private authService: AuthService) {
    this.employees = [];
  }

  ngOnInit(): void {
    this.authService.getAuthenticatedUser().subscribe({
      next: (authenticatedUser) => {
        this.user = authenticatedUser;

        this.listEmployees();
      },
      error: (err) => {
        console.log(err);
        this.user = undefined;
      },
    });
  }

  public remove($event: any, employee: Employee): void {
    $event.preventDefault();

    if (confirm(`Deseja realmente remover o funcionário ${employee.name}?`)) {
      this.employeeService.remove(employee).subscribe(responseDto => {
        if (responseDto.message === 'deleted') {
          this.listEmployees();
        } //treat error?
      });
    }
  }

  private listEmployees(): void {
    this.employeeService.getEmployees().subscribe(responseDto => {
      if (responseDto.entities) {
        this.employees = responseDto.entities!;
      } //treat error?
    });
  }
}
