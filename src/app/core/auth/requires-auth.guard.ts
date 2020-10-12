import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserService } from '../user/user.service';

@Injectable({providedIn: 'root'})
export class RequiresAuthGuard implements CanActivate {
    
    constructor(
        private userSevice: UserService,
        private router: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if(!this.userSevice.isLogged()){
            this.router.navigate(['home'],
                {  
                    queryParams: {
                        fromUrl: state.url // .charAt(0) == '/' ? state.url.substring(1, state.url.length) : state.url
                    }
                } 
            );
            return false;
        }
        return true;
    }    
}