import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerHomeComponent } from './components/customer-home/customer-home.component';
import {RouterModule} from "@angular/router";
import {CommonsModule} from "../commons";

@NgModule({
  declarations: [
    CustomerHomeComponent
  ],
    imports: [
        CommonModule,
        RouterModule,
        CommonsModule,
    ],
})
export class CustomerModule { }
