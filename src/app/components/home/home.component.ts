import { animate, transition, trigger, style, keyframes, state } from '@angular/animations';
import { Component, HostListener, OnInit } from '@angular/core';
import { delay, Observable, tap } from 'rxjs';
import { AnecdotesService } from 'src/app/services/anecdotes.service';
import { Anecdote } from 'src/models/anecdote.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('transition', [
      state('top', style({})),
      state('inview', style({})),
      state('bottom', style({})),
      transition('inview => bottom', [
        animate('800ms ease-in-out', keyframes([
          style({ opacity: 1, offset: 0 }),
          style({ opacity: 0, 'height': '150%', offset: 0.4 }),
          style({ opacity: 0, 'height': '50%', offset: 0.5 }),
          style({ 'height': '100%', opacity: 1, offset: 1 }),
        ]))
      ]),
      transition('inview => top', [
        animate('800ms ease-in-out', keyframes([
          style({ opacity: 1, offset: 0 }),
          style({ opacity: 0, 'height': '50%', offset: 0.4 }),
          style({ opacity: 0, 'height': '150%', offset: 0.5 }),
          style({ 'height': '100%', opacity: 1, offset: 1 }),
        ]))
      ])
    ])]
})

export class HomeComponent implements OnInit {
  public static readonly ANIMATION_DURATION = 500;

  anecdote$!: Observable<Anecdote>;
  anecdoteState = "inview";

  constructor(private anecdotesService: AnecdotesService) {}

  ngOnInit(): void {
    this.anecdote$ = this.anecdotesService.anecdote$.pipe();
  }

  next(): void {
    this.anecdotesService.next();
  }

  previous(): void {
    this.anecdotesService.previous();
  }

  @HostListener('wheel', ['$event'])
  public onViewportScroll() {
    let wheelEvent: WheelEvent = event as WheelEvent
    if(wheelEvent.deltaY > 0) {
      this.next()
      this.anecdoteState = "bottom"
      setTimeout(() => {
        this.anecdoteState = "inview"
      }, 800);
    }
    else if(wheelEvent.deltaY < 0) {
      this.previous()
      this.anecdoteState = "top"
      setTimeout(() => {
        this.anecdoteState = "inview"
      }, 800);
    }
  }

}

