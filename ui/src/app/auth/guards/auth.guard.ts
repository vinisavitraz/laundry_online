import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";
import {User} from "../../commons/models/user.model";
import {RoutesEnum} from "../../commons/enums/routes.enum";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
      private authService: AuthService,
      private router: Router,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const user: User | null = this.authService.getAuthenticatedUser();

    if (user === null) {
      this.router.navigate([RoutesEnum.LOGIN], { queryParams: { error: 'Usuário não autenticado' } })
      return false;
    }

    if (route.data?.['role'] && !route.data?.['role'].includes(user.role)) {
      this.router.navigate([RoutesEnum.LOGIN], { queryParams: { error: 'Acesso negado a rota `' + state.url + '` ao tipo de usuário `' + user.role + '`' } })
      return false;
    }

    return true;
  }
  
}
