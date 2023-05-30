import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../auth/services/auth.service";
import {User} from "../../models/user.model";
import {RoutesEnum} from "../../enums/routes.enum";

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
      next: (authenticatedUserDto) => {
        this.authenticatedUser = authenticatedUserDto.entity;
      },
      error: (err) => {
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
      this.router.navigate([RoutesEnum.LOGIN]);
    });
  }
}
