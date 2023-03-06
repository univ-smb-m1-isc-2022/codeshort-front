import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";

@Injectable({
    providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

    private readonly token: string | null;

    constructor() {
        this.token = localStorage.getItem('token');
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.token) {
            const request_with_token = request.clone({
                setHeaders: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.token}`
                }
            });
            return next.handle(request_with_token);
        }
        return next.handle(request);
    }
}