import { Component } from '@angular/core';
import {AuthService} from "./auth/services/auth.service";
import {RoutesEnum} from "./commons/enums/routes.enum";
import {Router} from "@angular/router";

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
    this.authService.getAuthenticatedUser().subscribe({
      next: (authenticatedUser) => {
        if (authenticatedUser === undefined) {
          this.authService.clearAuthUserInfo();
          this.router.navigate([RoutesEnum.LOGIN]);
        }
      },
      error: (err) => {
        this.authService.clearAuthUserInfo();
        this.router.navigate([RoutesEnum.LOGIN]);
      },
    });
  }
}
