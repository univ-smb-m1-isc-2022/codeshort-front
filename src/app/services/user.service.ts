import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { throwError } from "rxjs/internal/observable/throwError";
import { catchError } from "rxjs/internal/operators/catchError";
import { environment } from "src/environment/environment";

@Injectable({
    providedIn: 'root'
})
  
export class UserService {
    private apiURL = environment.apiKey;

    constructor(private httpClient: HttpClient) { }

    getUserProps(username : string): Observable<any> {
        return this.httpClient.get<any>(this.apiURL + '/user/' + username)
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

}