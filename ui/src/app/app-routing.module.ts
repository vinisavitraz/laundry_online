import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RoutesEnum} from "./commons/enum/routes.enum";
import {LoginComponent} from "./auth/component/login/login.component";
import {RegisterComponent} from "./auth/component/register/register.component";

const routes: Routes = [
  {
    path: RoutesEnum.LOGIN,
    component: LoginComponent,
  },
  {
    path: RoutesEnum.REGISTER,
    component: RegisterComponent,
  },
  {
    path: RoutesEnum.CUSTOMER_HOME,
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
