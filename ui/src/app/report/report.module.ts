import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './components/report/report.component';
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    ReportComponent
  ],
    imports: [
        CommonModule,
        FormsModule
    ]
})
export class ReportModule { }
