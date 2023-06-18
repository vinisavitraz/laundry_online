import { Component } from '@angular/core';
import {AuthService} from "./auth/services/auth.service";
import {RoutesEnum} from "./commons/enums/routes.enum";
import {Router} from "@angular/router";
import {RolesEnum} from "./commons/enums/roles.enum";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
      private router: Router,
      private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.routeToHomePageIfAuthenticated();
  }

  private routeToHomePageIfAuthenticated(): void {
    this.authService.getAuthenticatedUserOnWS().subscribe({
      next: (authenticatedUserDto) => {
        if (!authenticatedUserDto.entity) {
          return;
        }

        this.authService.setAuthenticatedUser(authenticatedUserDto.entity);

        const role: string = authenticatedUserDto.entity.role!;

        if (role === RolesEnum.CUSTOMER) {
          this.router.navigate([RoutesEnum.CUSTOMER_HOME]);
          return;
        }
        if (role === RolesEnum.EMPLOYEE) {
          this.router.navigate([RoutesEnum.EMPLOYEE_HOME]);
        }
      },
      error: (err) => {
        if (err.status === 401) {
          this.router.navigate([RoutesEnum.LOGIN]);
        }
      },
    });
  }
}
