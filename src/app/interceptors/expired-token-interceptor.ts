import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import { AuthentificationService } from '../services/authentification.service';

@Injectable()
export class ExpiredTokenInterceptor implements HttpInterceptor {

    constructor(private authenticationService : AuthentificationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {

        return next.handle(request).pipe(
            catchError(error => {
                return throwError(() => {
                    switch(error.status){
                        case 403:
                            this.authenticationService.logout();
                    }
                });
            })
        );

    }
}