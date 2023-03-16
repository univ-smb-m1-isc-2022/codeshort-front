import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";

@Injectable({
    providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem("token");
        if(request.url.includes("/api/user/picture")) {
            const request_with_token = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(request)
            return next.handle(request_with_token);
        } else if (token) {
            const request_with_token = request.clone({
                setHeaders: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            return next.handle(request_with_token);
        }
        const request_with_headers = request.clone({
                setHeaders: {
                    'Content-Type': 'application/json'
                }
            });
        return next.handle(request_with_headers);
    }
}