import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../auth/services/auth.service";
import {User} from "../../models/user.model";
import {RoutesEnum} from "../../enums/routes.enum";
import {Observable, of} from "rxjs";
import {NavbarOptionsEnum} from "../../enums/navbar-options.enum";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  activeNavbarOption: string = NavbarOptionsEnum.HOME;
  authenticated: Observable<boolean>;

  constructor(
      private router: Router,
      private authService: AuthService,
  ) {
    this.authenticated = of(false);
    this.activeNavbarOption = NavbarOptionsEnum.HOME;
  }

  ngOnInit(): void {
    this.authenticated = of(this.authService.getAuthenticatedUser() != null);
  }

  public goToOption(optionName: string, uri: string): void {
    this.activeNavbarOption = optionName;
    this.router.navigate([uri]);
  }

  get authenticatedUser(): User | null {
    return this.authService.getAuthenticatedUser();
  }

  public logout(): void {
    this.authService.logout();
    this.router.navigate([RoutesEnum.LOGIN]);
  }
}
