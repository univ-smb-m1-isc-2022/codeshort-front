import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Anecdote } from 'src/models/anecdote.model';
import { environment } from 'src/environment/environment';
import { Vote } from 'src/models/vote.model';

@Injectable({
  providedIn: 'root'
})

export class AnecdotesService {
    
    private apiURL = environment.apiKey + "/anecdote";

    private currentId: number = 0;
    private anecdote = new BehaviorSubject<Anecdote | null>(null);
    anecdote$ = this.anecdote.asObservable();
    private anecdotes: Anecdote[] = [];

    constructor(private httpClient: HttpClient){}

    getRandomAnecdotes(): Observable<any> {
        return this.httpClient.get<any>(this.apiURL + "/random")
        .pipe(
          catchError(this.errorHandler)
        )
    }
  
    setAnecdotes(anecdotes: Anecdote[]) {
      if (anecdotes.length != 0) {
        this.anecdotes = anecdotes;
        this.anecdote.next(anecdotes[0]);
      }
    }

    getAllTopics(): Observable<any> {
      return this.httpClient.get<any>(environment.apiKey + "/topic")
        .pipe(
          catchError(this.errorHandler)
        )
    }

    createAnecdote(request: any): Observable<any> {
      return this.httpClient.post<any>(this.apiURL, JSON.stringify(request))
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
  
    setVote(anecdoteId: number, vote: Vote, starred: boolean) {

      let route = this.apiURL + "/" + anecdoteId + "/rating";

      let request = JSON.stringify({ vote: vote, starred: starred });

      return this.httpClient.post<any>( route, request).pipe( catchError(this.errorHandler))  
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