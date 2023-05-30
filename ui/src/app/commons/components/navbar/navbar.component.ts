import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../auth/services/auth.service";
import {User} from "../../models/user.model";
import {RoutesEnum} from "../../enums/routes.enum";
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  authenticated: boolean;

  authenticatedUser: User | undefined;

  constructor(
      private router: Router,
      private authService: AuthService,
  ) {
    this.authenticatedUser = undefined;
    this.authenticated = false;
  }

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe(authenticated => {
      this.authenticated = authenticated;
    });

    this.authService.getAuthenticatedUser().subscribe({
      next: (authenticatedUserDto) => {
        this.authenticatedUser = authenticatedUserDto.entity;
        this.authService.setAuthenticated(true);
      },
      error: (err) => {
        this.authService.setAuthenticated(false);
        console.log(err);
        this.authenticatedUser = undefined;
      },
    });
  }

  public goToOption(optionName: string, uri: string): void {
    this.router.navigate([uri]);
  }

  // get authenticatedUser(): User | null {
  //   return this.authService.getAuthenticatedUser();
  // }

  public logout(): void {
    this.authService.logout().subscribe(message => {
      this.authService.setAuthenticated(false);
      this.router.navigate([RoutesEnum.LOGIN]);
    });
  }
}
