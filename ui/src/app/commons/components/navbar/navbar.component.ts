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

  authenticatedUser: User | undefined;

  constructor(
      private router: Router,
      private authService: AuthService,
  ) {
    this.authenticatedUser = undefined;
  }

  ngOnInit(): void {
    this.authService.getAuthenticatedUser().subscribe({
      next: (authenticatedUser) => {
        this.authenticatedUser = authenticatedUser;
      },
      error: (err) => {
        this.authenticatedUser = undefined;
      },
    });
  }

  public goToOption(optionName: string, uri: string): void {
    this.router.navigate([uri]);
  }

  public logout(): void {
    this.authService.logout().subscribe(message => {
      this.authService.setAuthenticatedUser(undefined);
      this.router.navigate([RoutesEnum.LOGIN]);
    });
  }
}
