import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewUser } from 'src/app/core/user/new-user';

import { environment } from './../../../environments/environment';
const API_URL = environment.apiURl;

@Injectable()
export class SignUpService {


    constructor (
        private http: HttpClient) {}

    checkUserNameTaken(userName: string){
        return this.http.get(API_URL + '/user/exists/' + userName);
    }

    signup(newUser: NewUser) {
        return this.http.post(API_URL + '/user/signup', newUser);
    }
}