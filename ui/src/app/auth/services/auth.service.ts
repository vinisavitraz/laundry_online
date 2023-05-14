import { Injectable } from '@angular/core';
import {AuthenticatedUser} from "../../commons/models/authenticated-user.model";
import {Observable, of} from "rxjs";
import {RequestLoginDto} from "../dto/request-login.dto";
import {RolesEnum} from "../../commons/enums/roles.enum";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authenticatedUser: AuthenticatedUser | null;

  constructor() {
    this.authenticatedUser = null;
  }

  public getAuthenticatedUser(): AuthenticatedUser | null {
    return this.authenticatedUser;
  }

  public setAuthenticatedUser(authenticatedUser: AuthenticatedUser): void {
    this.authenticatedUser = authenticatedUser;
  }

  public login(requestLoginDto: RequestLoginDto): Observable<AuthenticatedUser | null> {
    if (requestLoginDto.email === undefined) {
      throw new Error('User email not provided');
    }
    if (requestLoginDto.password === undefined) {
      throw new Error('User password not provided');
    }

    const authenticatedUser: AuthenticatedUser =  new AuthenticatedUser(1, 'Jones', requestLoginDto.email, RolesEnum.CUSTOMER);

    return of(authenticatedUser);
  }

  public logout(): void {

  }
}
