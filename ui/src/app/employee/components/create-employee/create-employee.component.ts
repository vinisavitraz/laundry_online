import {Component, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {RoutesEnum} from "../../../commons/enums/routes.enum";
import {EmployeeService} from "../../services/employee.service";
import {Employee} from "../../../commons/models/employee.model";

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent {
  @ViewChild('createEmployeeForm') createEmployeeForm!: NgForm;
  employee!: Employee;

  constructor(private employeeService: EmployeeService, private router: Router) {}

  ngOnInit(): void {
    this.employee = new Employee();
  }

  public async save(): Promise<void> {
    if (this.createEmployeeForm.form.valid) {
      this.employeeService.saveEmployee(this.employee);
      await this.router.navigate([RoutesEnum.LIST_EMPLOYEES])
    }
  }
}
