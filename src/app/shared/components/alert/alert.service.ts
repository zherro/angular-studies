import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Alert, Alertype } from './alert';

@Injectable({providedIn: 'root'})
export class AlertService {

    alertSubject: Subject<Alert> = new Subject<Alert>();
    keepAfterRouterChange = false;

    constructor(private router: Router) {
        router.events.subscribe(event => {
            if(event instanceof NavigationStart){
                if(this.keepAfterRouterChange) {
                    this.keepAfterRouterChange = false;
                } else {
                    this.clear();
                }
            }
        });
    }

    success(message: string, keepAfterRouterChange: boolean = false) {
        this.alert(Alertype.SUCCESS, message, keepAfterRouterChange); 
    }

    warning(message: string, keepAfterRouterChange: boolean = false) { 
        this.alert(Alertype.WARNING, message, keepAfterRouterChange); 
    }

    danger(message: string, keepAfterRouterChange: boolean = false) { 
        this.alert(Alertype.DANGER, message, keepAfterRouterChange); 
    }

    info(message: string, keepAfterRouterChange: boolean = false) { 
        this.alert(Alertype.INFO, message, keepAfterRouterChange); 
    }

    private alert(type: Alertype, message: string, keepAfterRouterChange: boolean = false){
        this.keepAfterRouterChange = keepAfterRouterChange;  
        this.alertSubject.next(new Alert(type, message));
    }

    getAlert() {
        return this.alertSubject.asObservable();
    }

    clear() {
        this.alertSubject.next(null);
    }
}