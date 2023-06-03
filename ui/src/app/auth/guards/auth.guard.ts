import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";
import {RoutesEnum} from "../../commons/enums/routes.enum";
import {Token} from "../../commons/models/token.model";

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
    const tokenJWT: Token | null = this.authService.getTokenJWT();

    if (tokenJWT === null) {
      this.router.navigate([RoutesEnum.LOGIN], { queryParams: { error: 'Usuário não autenticado' } })
      return false;
    }

    const userRole: string | null = this.authService.getUserRole();

    if (userRole === null) {
      this.router.navigate([RoutesEnum.LOGIN], { queryParams: { error: 'Usuário não possui `role`' } })
      return false;
    }

    if (route.data?.['role'] && !route.data?.['role'].includes(userRole)) {
      this.router.navigate([RoutesEnum.LOGIN], { queryParams: { error: 'Acesso negado a rota `' + state.url + '` ao tipo de usuário `' + userRole + '`' } })
      return false;
    }

    return true;
  }
  
}
