import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeHomeComponent } from './components/employee-home/employee-home.component';
import { ListEmployeesComponent } from './components/list-employees/list-employees.component';
import { CreateEmployeeComponent } from './components/create-employee/create-employee.component';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {CommonsModule} from "../commons";

@NgModule({
  declarations: [
    EmployeeHomeComponent,
    ListEmployeesComponent,
    CreateEmployeeComponent,
    EditEmployeeComponent
  ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        CommonsModule,
    ]
})
export class EmployeeModule { }
