import { Injectable } from '@angular/core';
import {User} from "../../commons/models/user.model";
import {Observable, of} from "rxjs";
import {RequestLoginDto} from "../dto/request/request-login.dto";
import {UserService} from "../../user/services/user.service";
import {LoginResponseDto} from "../dto/response/login-response.dto";
import {ErrorMessagesEnum} from "../../commons/enums/error-messages.enum";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  static AUTHENTICATED_USER_KEY = 'authenticatedUser';
  constructor(
      private userService: UserService,
  ) {}

  public getAuthenticatedUser(): User | null {
    const authenticatedUser: string | null = localStorage.getItem(AuthService.AUTHENTICATED_USER_KEY);

    if (authenticatedUser === null) {
      return null;
    }

    return JSON.parse(authenticatedUser);
  }

  public setAuthenticatedUser(authenticatedUser: User): void {
    localStorage.setItem(AuthService.AUTHENTICATED_USER_KEY, JSON.stringify(authenticatedUser));
  }

  public login(requestLoginDto: RequestLoginDto): Observable<LoginResponseDto> {
    if (requestLoginDto.email === undefined) {
      return of(new LoginResponseDto(null, ErrorMessagesEnum.EMAIL_NOT_PROVIDED));
    }
    if (requestLoginDto.password === undefined) {
      return of(new LoginResponseDto(null, ErrorMessagesEnum.PASSWORD_NOT_PROVIDED));
    }

    const user: User | undefined = this.userService.findUserByEmail(requestLoginDto.email);

    if (user === undefined) {
      return of(new LoginResponseDto(null, ErrorMessagesEnum.EMAIL_NOT_FOUND));
    }

    if (requestLoginDto.password != '1234') {
      return of(new LoginResponseDto(null, ErrorMessagesEnum.INVALID_PASSWORD));
    }

    return of(new LoginResponseDto(user));
  }

  public logout(): void {
    localStorage.removeItem(AuthService.AUTHENTICATED_USER_KEY);
  }
}
