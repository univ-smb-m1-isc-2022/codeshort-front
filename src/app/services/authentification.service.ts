import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthentificationService {
    private apiURL = environment.apiKey + "/auth";

    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    private user = new BehaviorSubject<String | null>(localStorage.getItem("username"));
    user$ = this.user.asObservable();
  
    constructor(private httpClient: HttpClient) { }
  
    login(form : any): Observable<any> {
        return this.httpClient.post<any>(this.apiURL + '/authenticate', JSON.stringify(form), this.httpOptions)
        .pipe(
          catchError(this.errorHandler)
        )
    }

    register(form : any): Observable<any> {
        return this.httpClient.post<any>(this.apiURL + '/register', JSON.stringify(form), this.httpOptions)
        .pipe(
          catchError(this.errorHandler)
        )
    }

    errorHandler(error: { error: { message: string; }; status: any; message: any; }) {
        let errorMessage = '';
        if(error.error instanceof ErrorEvent) {
          errorMessage = error.error.message;
        } else {
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        return throwError(errorMessage);
    }

    setUser(value: String) {
        this.user.next(value);
    }
}