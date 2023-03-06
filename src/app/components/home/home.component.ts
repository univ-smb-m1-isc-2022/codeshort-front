import { animate, transition, trigger, style, keyframes, state } from '@angular/animations';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { delay, Observable, tap } from 'rxjs';
import { AnecdotesService } from 'src/app/services/anecdotes.service';
import { AuthentificationService } from 'src/app/services/authentification.service';
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
        animate('1000ms ease-in-out', keyframes([
          style({ opacity: 1, offset: 0 }),
          style({ opacity: 0, offset: 0.4 }),
          style({ opacity: 0, offset: 0.6 }),
          style({ opacity: 1, offset: 1 }),
        ]))
      ]),
      transition('inview => top', [
        animate('1000ms ease-in-out', keyframes([
          style({ opacity: 1, offset: 0 }),
          style({ opacity: 0, offset: 0.4 }),
          style({ opacity: 0, offset: 0.6 }),
          style({ opacity: 1, offset: 1 }),
        ]))
      ])
    ])]
})

export class HomeComponent implements OnInit {
  public static readonly ANIMATION_DURATION = 500;

  anecdote$!: Observable<Anecdote | null>;
  user$!: Observable<String | null>;
  anecdoteState = "inview";

  constructor(
    private anecdotesService: AnecdotesService, 
    private router: Router, 
    private authentificationService: AuthentificationService) {}

  ngOnInit(): void {
    this.anecdotesService.getRandomAnecdotes().subscribe(data => {
      var anecdotesTmp: Anecdote[] = [];
      data.anecdotes.forEach((e : any) => {
        console.log(e);
        var anecdote: Anecdote = {
          id: e.id,
          topics: e.topics,
          description: e.content,
          upvotes: e.upvotes,
          downvotes: e.downvotes,
          starred: e.starred,
          owner: e.author,
          vote: e.vote
        };
        anecdotesTmp.push(anecdote);
        this.anecdotesService.setAnecdotes(anecdotesTmp);
      });
    });
    this.anecdote$ = this.anecdotesService.anecdote$.pipe();
    this.user$ = this.authentificationService.user$;
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
      this.anecdoteState = "bottom"
      setTimeout(() => {
        this.next()
        this.anecdoteState = "inview"
      }, 500);
    }
    else if(wheelEvent.deltaY < 0) {
      this.anecdoteState = "top"
      setTimeout(() => {
        this.previous()
        this.anecdoteState = "inview"
      }, 500);
    }
  }

  goToCreateAnecdote() : void {
    this.router.navigateByUrl('home/new-anecdote');
  }

}

