import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { TokenService } from '../toke/token.service';
import jwt_decode from 'jwt-decode';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new BehaviorSubject<User>(null);
  private userName: string;

  constructor(private tokeService: TokenService) {

    this.tokeService.hasToken() &&
      this.decodeAndNotfy();
  }

  setToken(token: string) {
    this.tokeService.setToken(token);
    this.decodeAndNotfy();
  }

  getUser() {
    return this.userSubject.asObservable();
  }

  private decodeAndNotfy() {
    const token = this.tokeService.getToken();
    const user = jwt_decode(token) as User;
    this.userName = user.name;
    this.userSubject.next(user);
  }

  logout() {
    this.tokeService.removeToken()
    this.userSubject.next(null);
  }

  isLogged() {
    return this.tokeService.hasToken();
  }

  getUserName() {
    return this.userName;
  }
}
