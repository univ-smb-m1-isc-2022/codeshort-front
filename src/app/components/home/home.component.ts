import { animate, transition, trigger, style, keyframes } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { delay, Observable, tap } from 'rxjs';
import { AnecdotesService } from 'src/app/services/anecdotes.service';
import { Anecdote } from 'src/models/anecdote.model';

const annotationAnimation = trigger ('annotationAnimation', [
  transition('* <=> *', [
    animate('800ms ease-in-out', keyframes([
      style({ opacity: 1, offset: 0 }),
      style({ opacity: 0, 'height': '50%', offset: 0.4 }),
      style({ opacity: 0, 'height': '150%', offset: 0.5 }),
      style({ 'height': '100%', opacity: 1, offset: 1 }),
    ]))
  ]),
])

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    annotationAnimation
  ]
})

export class HomeComponent implements OnInit {

  anecdote$!: Observable<Anecdote>;
  anecdoteState = true;

  constructor(private anecdotesService: AnecdotesService) {}

  ngOnInit(): void {
    this.anecdote$ = this.anecdotesService.anecdote$.pipe(
      tap(() => this.anecdoteState = !this.anecdoteState),
      delay(500)
    );
  }

  next(): void {
    this.anecdotesService.next();
  }

}
