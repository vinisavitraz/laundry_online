import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "./services/auth.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {JwtInterceptor} from "./interceptors/jwt.interceptor";
import {CustomerModule} from "../customer/customer.module";

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    FormsModule,
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    CustomerModule,
  ],
  providers: [
    JwtInterceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    AuthService
  ],
})
export class AuthModule { }
