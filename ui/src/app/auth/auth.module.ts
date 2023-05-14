import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    FormsModule,
    RouterModule,
    CommonModule,
  ]
})
export class AuthModule { }
