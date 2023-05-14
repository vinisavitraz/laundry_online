import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../auth/services/auth.service";
import {AuthenticatedUser} from "../../models/authenticated-user.model";
import {RoutesEnum} from "../../enums/routes.enum";
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  authenticated: Observable<boolean>;

  constructor(
      private router: Router,
      private authService: AuthService,
  ) {
    this.authenticated = of(false);
  }

  ngOnInit(): void {
    this.authenticated = of(this.authService.getAuthenticatedUser() != null);
  }

  get authenticatedUser(): AuthenticatedUser | null {
    return this.authService.getAuthenticatedUser();
  }

  public logout(): void {
    this.authService.logout();
    this.router.navigate([RoutesEnum.LOGIN]);
  }
}
