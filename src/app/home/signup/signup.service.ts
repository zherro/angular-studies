import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API_URL = "http://localhost:3000";

@Injectable({providedIn: 'root'})
export class SignUpService {


    constructor (private http: HttpClient) {}

    checkUserNameTaken(userName: string){
        return this.http.get(API_URL + '/user/exists/' + userName);
    }
}