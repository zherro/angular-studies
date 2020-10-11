import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { UserService } from 'src/app/core/user/user.service';
import * as StakeTrace from 'stacktrace-js';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    
    constructor(private injector: Injector){}

    handleError(error: any): void {
        // Para não injetar no contrutor
        let location = this.injector.get(LocationStrategy);
        // exemplo
        // let userService = this.injector.get(UserService);

        let url = location instanceof PathLocationStrategy
                        ? location.path()
                        : '';

        let message = error.message ? error.message : error.toString();
        
        if(!error.url && !error.headers){

            StakeTrace
                .fromError(error)
                .then(stakeFrame => {
                    let stalAsString = stakeFrame
                            .map(sf => sf.toString())
                            .join('\n');
                    
                    console.log(message)
                    console.table(stalAsString)
                });
        }

    }

}