import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { environment } from 'src/environment/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthentificationService {
    private apiURL = environment.apiKey + "/auth";

    private user = new BehaviorSubject<String | null>(localStorage.getItem("username"));
    private profilePictureUri = new BehaviorSubject<string | null>(localStorage.getItem("pictureUri"));
    user$ = this.user.asObservable();
    profilePictureUri$ = this.profilePictureUri.asObservable();
    timeStamp: number | null = null;
  
    constructor(private httpClient: HttpClient, private router: Router) { }
  
    login(form : any): Observable<any> {
        return this.httpClient.post<any>(this.apiURL + '/authenticate', JSON.stringify(form))
        .pipe(
          catchError(this.errorHandler)
        )
    }

    register(form : any): Observable<any> {
        return this.httpClient.post<any>(this.apiURL + '/register', JSON.stringify(form))
        .pipe(
          catchError(this.errorHandler)
        )
    }

    getUser() {
      return localStorage.getItem("username");
    }

    logout() {
      localStorage.clear();
      this.router.navigateByUrl('login');
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

    setLinkPicture(url: string) {
      localStorage.setItem('pictureUri', environment.serverKey + "/images/" + url)
      this.timeStamp = (new Date()).getTime();
    }

    getLinkPicture(){
      if(this.timeStamp) {
        return this.profilePictureUri.value + '?' + this.timeStamp;
      }
      return this.profilePictureUri.value;
    }
}