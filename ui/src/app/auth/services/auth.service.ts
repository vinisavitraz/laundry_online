import { Injectable } from '@angular/core';
import {AuthenticatedUser} from "../../commons/models/authenticated-user.model";
import {Observable, of} from "rxjs";
import {RequestLoginDto} from "../dto/request-login.dto";
import {RolesEnum} from "../../commons/enums/roles.enum";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public getAuthenticatedUser(): AuthenticatedUser | null {
    const authenticatedUser: string | null = localStorage.getItem('authenticatedUser');

    if (authenticatedUser === null) {
      return null;
    }

    return JSON.parse(authenticatedUser);
  }

  public setAuthenticatedUser(authenticatedUser: AuthenticatedUser): void {
    localStorage.setItem('authenticatedUser', JSON.stringify(authenticatedUser));
  }

  public login(requestLoginDto: RequestLoginDto): Observable<AuthenticatedUser | null> {
    if (requestLoginDto.email === undefined) {
      throw new Error('User email not provided');
    }
    if (requestLoginDto.password === undefined) {
      throw new Error('User password not provided');
    }

    const authenticatedUser: AuthenticatedUser =  new AuthenticatedUser(1, 'Jones', requestLoginDto.email, RolesEnum.EMPLOYEE);

    return of(authenticatedUser);
  }

  public logout(): void {
    localStorage.removeItem('authenticatedUser');

  }
}
