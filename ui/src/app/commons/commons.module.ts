import { NgModule } from '@angular/core';
import { OnlyNumbersDirective } from './directives';
import { NavbarComponent } from './components/navbar/navbar.component';
import {RouterModule} from "@angular/router";
import {AuthModule} from "../auth/auth.module";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    OnlyNumbersDirective,
    NavbarComponent
  ],
  exports: [
    OnlyNumbersDirective,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AuthModule,
  ]
})
export class CommonsModule { }
