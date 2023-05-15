import { Injectable } from '@angular/core';
import {User} from "../../commons/models/user.model";
import {Observable, of} from "rxjs";
import {RequestLoginDto} from "../dto/request/request-login.dto";
import {UserService} from "../../user/services/user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
      private userService: UserService,
  ) {}

  public getAuthenticatedUser(): User | null {
    const authenticatedUser: string | null = localStorage.getItem('authenticatedUser');

    if (authenticatedUser === null) {
      return null;
    }

    return JSON.parse(authenticatedUser);
  }

  public setAuthenticatedUser(authenticatedUser: User): void {
    localStorage.setItem('authenticatedUser', JSON.stringify(authenticatedUser));
  }

  public login(requestLoginDto: RequestLoginDto): Observable<User | null> {
    if (requestLoginDto.email === undefined) {
      throw new Error('User email not provided');
    }
    if (requestLoginDto.password === undefined) {
      throw new Error('User password not provided');
    }

    const user: User | undefined = this.userService.findUserByEmail(requestLoginDto.email);

    if (user === undefined) {
      throw new Error('User with email provided not found');
    }

    return of(user);
  }

  public logout(): void {
    localStorage.removeItem('authenticatedUser');
  }
}
