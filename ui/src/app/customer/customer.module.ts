import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerHomeComponent } from './components/customer-home/customer-home.component';
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    CustomerHomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ]
})
export class CustomerModule { }
