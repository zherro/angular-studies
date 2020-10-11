import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Photo } from './photo';

const API = 'http://localhost:3000/';

@Injectable({ providedIn: 'root' })
export class PhotoService{  

    constructor(private http: HttpClient){}

    listFromUser(userName: string){
        return this.http
            .get<Photo[]>(API + userName + '/photos');
    }

    listFromUserPaginate(userName: string, page: Number){
        const params = new HttpParams()
        .append('page', page.toString());
        return this.http
            .get<Photo[]>(API + userName + '/photos', {params});
    }

    upload(description: string, allowComments: boolean, file: File) {
        let formData = new FormData();
        formData.append('description', description);
        formData.append('allowComments', description ?  'true' : 'false');
        formData.append('imageFile', file);

        return this.http.post(API + 'photos/upload', formData);
    }
}