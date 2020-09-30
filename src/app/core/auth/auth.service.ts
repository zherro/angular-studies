import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
    ) { }

  authenticate(userName: string, password: string){
    return this.http.post(API_URL + '/user/login', {userName, password})
  }
}
