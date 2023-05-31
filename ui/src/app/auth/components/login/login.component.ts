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
    this.routeToHomePageIfAuthenticated();
  }

  public executeLogin(): void {
    this.loading = true;

    if (!this.loginForm.form.valid) {
      this.loading = false;
      return;
    }

    this.authService.login(this.dto).subscribe({
      next: (loginResponseDto) => {
        console.log('loginResponseDto');
        console.log(loginResponseDto);
        this.loading = false;

        this.authService.saveTokenJWT(loginResponseDto.token);
        this.authService.saveUserRole(loginResponseDto.userRole);

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
    console.log('routeToHomePageIfAuthenticated');
    this.authService.getAuthenticatedUser().subscribe({
      next: (authenticatedUserDto) => {
        console.log('return routeToHomePageIfAuthenticated');
        console.log(authenticatedUserDto.entity);
        if (!authenticatedUserDto.entity) {
          return;
        }

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
        console.log(err);
      },
    });
  }
}
