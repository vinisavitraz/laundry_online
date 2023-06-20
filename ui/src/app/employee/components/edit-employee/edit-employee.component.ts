import {Component, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {RoutesEnum} from "../../../commons/enums/routes.enum";
import {Employee} from "../../../commons/models/employee.model";
import {EmployeeService} from "../../services/employee.service";

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent {
  @ViewChild('editEmployeeForm') editEmployeeForm!: NgForm;
  employee!: Employee;

  constructor(
      private employeeService: EmployeeService,
      private router: Router,
      private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const id: number = +this.route.snapshot.params['id'];

    this.employeeService.findById(id).subscribe(responseDto => {
      if (responseDto.entity === null) {
        throw new Error('Employee not found. ID: ' + id);
      }

      this.employee = responseDto.entity!;
    });
  }

  public async save(): Promise<void> {
    if (this.editEmployeeForm.form.valid) {
      this.employeeService.saveEmployee(this.employee).subscribe({
            next: (dto) => {
              this.router.navigate([RoutesEnum.LIST_EMPLOYEES])
            },
            error: (err) => {
              alert(err.error.message);
              console.log(err.error.message);
            },
          }
      );
    }
  }
}
