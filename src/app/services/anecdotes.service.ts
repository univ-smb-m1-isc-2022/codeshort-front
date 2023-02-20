import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Anecdote } from 'src/models/anecdote.model';

@Injectable({
  providedIn: 'root'
})

export class AnecdotesService {
    private anecdotes: Anecdote[] = [
        {
            id: 0,
            topics: ["JS","Humour","Back"],
            description: "Test 1",
            upvotes: 5,
            downvotes: 6,
            stars: 7,
            owner: "Mathis"
        },
        {
            id: 1,
            topics: ["Python","Humour","Front"],
            description: "Test 2",
            upvotes: 2,
            downvotes: 3,
            stars: 4,
            owner: "Mathis"
        },
        {
            id: 2,
            topics: ["JS","Serieux","Back"],
            description: "Test 3",
            upvotes: 7,
            downvotes: 8,
            stars: 9,
            owner: "Mathis"
        }
    ]

    private currentId: number = 0;
    private anecdote = new BehaviorSubject<Anecdote>(this.anecdotes[0]);
    anecdote$ = this.anecdote.asObservable();


    getAllAnecdotes(): Anecdote[] {
        return this.anecdotes;
    }

    getAnecdoteById(anecdoteId: number): Anecdote {
        const anecdote = this.anecdotes.find(anecdote => anecdote.id === anecdoteId);
        if (anecdote) {
            return anecdote;
        } else {
            throw new Error('Anecdote not found!');
        }
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
}