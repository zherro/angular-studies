import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../user/user.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
    
    constructor(
        private userSevice: UserService,
        private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if(!this.userSevice.isLogged()){
            this.router.navigate([''],
                    {  
                        queryParams: {
                            fromUrl: state.url
                        }
                    } 
                );
            return false;
        }
        return true;
    }    
}