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
    this.userSubject.next(user);
  }
}
