import { Component } from '@angular/core';
import {Employee} from "../../../commons/models/employee.model";
import {EmployeeService} from "../../services/employee.service";

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent {

  employees: Employee[];

  constructor(private employeeService: EmployeeService) {
    this.employees = [];
  }

  ngOnInit(): void {
    this.listEmployees();
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
