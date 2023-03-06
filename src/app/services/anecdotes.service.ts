import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Anecdote } from 'src/models/anecdote.model';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})

export class AnecdotesService {
    
    private apiURL = environment.apiKey + "/anecdote";

    private currentId: number = 0;
    private anecdote = new BehaviorSubject<Anecdote | undefined>(undefined);
    anecdote$ = this.anecdote.asObservable();
    private anecdotes: Anecdote[] = [];

    constructor(private httpClient: HttpClient){}

    getRandomAnecdotes(): Observable<any> {
        return this.httpClient.get<any>(this.apiURL + "/random")
        .pipe(
          catchError(this.errorHandler)
        )
    }

    next() {
        this.currentId++;
        if(this.currentId == this.anecdotes.length) this.currentId = 0;
        this.anecdote.next(this.anecdotes[this.currentId]);
    }

    previous() {
        this.currentId--;
        if(this.currentId == -1) this.currentId = this.anecdotes.length - 1;
        this.anecdote.next(this.anecdotes[this.currentId]);
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