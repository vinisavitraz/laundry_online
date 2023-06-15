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

    this.authService.login(this.dto).subscribe({
      next: (loginResponseDto) => {
        console.log('login - next - LoginComponent');
        this.loading = false;

        this.authService.saveAuthUserInfo(loginResponseDto.token, loginResponseDto.userRole);

        this.routeToHomePageIfAuthenticated();
      },
      error: (err) => {
        console.log(err);
        // if (loginResponseDto.errorMessage === null) {
        //   this.message = ErrorMessagesEnum.UNKNOWN_ERROR;
        //   return;
        // }
        //
        // this.message = loginResponseDto.errorMessage;
      }
    });
  }

  private routeToHomePageIfAuthenticated(): void {
    console.log('routeToHomePageIfAuthenticated - LoginComponent');
    this.authService.getAuthenticatedUserOnWS().subscribe({
      next: (authenticatedUserDto) => {
        if (!authenticatedUserDto.entity) {
          return;
        }

        this.authService.setAuthenticatedUser(authenticatedUserDto.entity);

        const role: string = authenticatedUserDto.entity.role!;

        this.router.navigate([RoutesEnum.HOME]);
        // if (role === RolesEnum.CUSTOMER) {
        //   this.router.navigate([RoutesEnum.HOME]);
        //   return;
        // }
        // if (role === RolesEnum.EMPLOYEE) {
        //   this.router.navigate([RoutesEnum.EMPLOYEE_HOME]);
        // }
      },
      error: (err) => {
        console.log(err);
        if (err.status === 401) {
          console.log('redirecting');
          this.message = 'Usuário não autenticado';
        }
      },
    });
  }
}
