import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {RequestLoginDto} from "../../dto/request/request-login.dto";
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../../commons/models/user.model";
import {RoutesEnum} from "../../../commons/enums/routes.enum";
import {RolesEnum} from "../../../commons/enums/roles.enum";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('loginForm') loginForm!: NgForm;

  dto: RequestLoginDto;
  loading: boolean;
  message!: string;

  constructor(
      private authService: AuthService,
      private router: Router,
      private route: ActivatedRoute
  ) {
    this.dto = new RequestLoginDto();
    this.loading = false;

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

    this.authService.login(this.dto).subscribe((authenticatedUser) => {
      this.loading = false;

      if (authenticatedUser === null) {
        this.message = 'Usuário ou senha inválidos';
        return;
      }

      this.authService.setAuthenticatedUser(authenticatedUser);
      this.routeToHomePage(authenticatedUser);
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
