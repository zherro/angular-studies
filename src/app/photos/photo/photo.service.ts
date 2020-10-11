import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Photo } from './photo';
import { PhotoComment } from './photo-comment';

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

        return this.http.post(API + 'photos/upload', formData,
            {
                observe: 'events',
                reportProgress: true
            });
    }

    findById(id: string) {
        return this.http.get<Photo>(API + 'photos/' + id );
    }

    getComments(photoId: string){
        return this.http.get<PhotoComment[]>(API + 'photos/' + photoId + '/comments');
    }

    addComment(photoId: string, commentText: string) {
        return this.http.post(
            API + 'photos/' + photoId + '/comments', {commentText}
        );
    }

    removePhoto(photoId: string) {
        return this.http.delete(API + 'photos/' + photoId);
    }

    like(photoId: string) {
        return this.http.post(API + 'photos/' + photoId + '/like', {}, { observe: 'response'})
            .pipe(map(res => true))
            .pipe(catchError(err => {
                return err.status == '304' ? of(false) : throwError(err);
            }));
    }
}