import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of, Subject, throwError} from "rxjs";
import {RequestLoginDto} from "../dto/request/request-login.dto";
import {LoginResponseDto} from "../dto/response/login-response.dto";
import {ErrorMessagesEnum} from "../../commons/enums/error-messages.enum";
import {HttpClient} from "@angular/common/http";
import {BASE_URL, DEFAULT_HEADERS} from "../../commons/constants/app-client.constants";
import {Token} from "../../commons/models/token.model";
import {AuthenticatedUserResponseDto} from "../dto/response/authenticated-user-response.dto";
import {LogoutResponseDto} from "../dto/response/logout-response.dto";
import {CustomerService} from "../../customer/services/customer.service";
import {User} from "../../commons/models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  static TOKEN_JWT_KEY = 'token_jwt';
  static USER_ROLE_KEY = 'user_role_jwt';

  private authenticatedUserSubject: Subject<User | undefined>;
  private readonly authenticatedUser: Observable<User | undefined>;

  constructor(
      private customerService: CustomerService,
      private httpClient: HttpClient,
  ) {
    this.authenticatedUserSubject = new BehaviorSubject<User | undefined>(undefined);
    this.authenticatedUser = this.authenticatedUserSubject.asObservable();
  }

  public getAuthenticatedUser(): Observable<User | undefined> {
    return this.authenticatedUser;
  }

  public setAuthenticatedUser(authenticatedUser: User | undefined): void {
    this.authenticatedUserSubject.next(authenticatedUser);
  }

  public getAuthenticatedUserOnWS(): Observable<AuthenticatedUserResponseDto> {
    return this.httpClient.get<AuthenticatedUserResponseDto>(
        BASE_URL + '/authenticated-user',
        DEFAULT_HEADERS
    );
  }

  public login(requestLoginDto: RequestLoginDto): Observable<LoginResponseDto> {
    if (requestLoginDto.email === undefined) {
      return throwError(() => ErrorMessagesEnum.EMAIL_NOT_PROVIDED);
    }
    if (requestLoginDto.password === undefined) {
      return throwError(() => ErrorMessagesEnum.PASSWORD_NOT_PROVIDED);
    }

    return this.httpClient.post<LoginResponseDto>(
        BASE_URL + '/auth',
        requestLoginDto,
        DEFAULT_HEADERS
    );
  }

  public logout(): Observable<LogoutResponseDto> {
    localStorage.removeItem(AuthService.TOKEN_JWT_KEY);
    localStorage.removeItem(AuthService.USER_ROLE_KEY);

    return this.httpClient.post<LogoutResponseDto>(
        BASE_URL + '/log-out',
        DEFAULT_HEADERS
    );
  }

  public getTokenJWT(): Token | null {
    const tokenStorage: string | null = localStorage.getItem(AuthService.TOKEN_JWT_KEY);

    if (tokenStorage == null) {
      return null;
    }

    return JSON.parse(tokenStorage);
  }

  public getUserRole(): string | null {
    const userRole: string | null = localStorage.getItem(AuthService.USER_ROLE_KEY);

    if (userRole == null) {
      return null;
    }

    return JSON.parse(userRole);
  }

  public saveAuthUserInfo(tokenJWT: Token, userRole: string): void {
    localStorage.setItem(AuthService.TOKEN_JWT_KEY, JSON.stringify(tokenJWT));
    localStorage.setItem(AuthService.USER_ROLE_KEY, JSON.stringify(userRole));
  }

  public clearAuthUserInfo(): void {
    localStorage.removeItem(AuthService.TOKEN_JWT_KEY);
    localStorage.removeItem(AuthService.USER_ROLE_KEY);
  }
}
