import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectReportComponent } from './components/select-report/select-report.component';
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    SelectReportComponent
  ],
    imports: [
        CommonModule,
        FormsModule
    ]
})
export class ReportModule { }
