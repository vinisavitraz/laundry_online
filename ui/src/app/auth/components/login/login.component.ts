import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {RequestLoginDto} from "../../dto/request/request-login.dto";
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../../commons/models/user.model";
import {RoutesEnum} from "../../../commons/enums/routes.enum";
import {RolesEnum} from "../../../commons/enums/roles.enum";
import {ErrorMessagesEnum} from "../../../commons/enums/error-messages.enum";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('loginForm') loginForm!: NgForm;

  dto: RequestLoginDto;
  loading: boolean;
  message: string | undefined;

  constructor(
      private authService: AuthService,
      private router: Router,
      private route: ActivatedRoute
  ) {
    this.dto = new RequestLoginDto();
    this.loading = false;
    this.message = undefined;

    const authenticatedUser: User | null = this.authService.getAuthenticatedUser();

    if (authenticatedUser != null) {
      this.routeToHomePage(authenticatedUser);
    }
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.message = params['error'];
    });
  }

  public executeLogin(): void {
    this.loading = true;

    if (!this.loginForm.form.valid) {
      this.loading = false;
      return;
    }

    this.authService.login(this.dto).subscribe((loginResponseDto) => {
      this.loading = false;

      if (loginResponseDto.user !== null) {
        this.authService.setAuthenticatedUser(loginResponseDto.user);
        this.routeToHomePage(loginResponseDto.user);
        return;
      }

      if (loginResponseDto.errorMessage === null) {
        this.message = ErrorMessagesEnum.UNKNOWN_ERROR;
        return;
      }

      this.message = loginResponseDto.errorMessage;
    });
  }

  private async routeToHomePage(authenticatedUser: User): Promise<void> {
    if (authenticatedUser.role === RolesEnum.CUSTOMER) {
      await this.router.navigate([RoutesEnum.CUSTOMER_HOME]);
      return;
    }
    if (authenticatedUser.role === RolesEnum.EMPLOYEE) {
      await this.router.navigate([RoutesEnum.EMPLOYEE_HOME]);
    }
  }
}
