import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { LoadingType } from './loading-type';

@Injectable({providedIn: 'root'})
export class LoadingService {

    loadingSubject = new Subject<LoadingType>();

    constructor(private router: Router) {

    }

    getLoading() {
        return this.loadingSubject
            .asObservable()
            .pipe(startWith(LoadingType.STOPPED));
    }

    start() {
        this.loadingSubject.next(LoadingType.LOADING);
    }

    stop() {
        this.loadingSubject.next(LoadingType.STOPPED);
    }

}