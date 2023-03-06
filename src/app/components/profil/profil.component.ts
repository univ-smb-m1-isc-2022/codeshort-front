import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { AnecdotesService } from 'src/app/services/anecdotes.service';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { Anecdote } from 'src/models/anecdote.model';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  user!: string;
  me: string | null = this.authentificationService.getUser();
  starredFilter!: boolean;
  anecdotes$!: Observable<Anecdote[] | null>;

  private anecdotes = new BehaviorSubject<Anecdote[] | null>(null);

  constructor(private route: ActivatedRoute, private authentificationService: AuthentificationService, private anecdotesService : AnecdotesService) { }
  
  ngOnInit(): void {
    this.anecdotes$ = this.anecdotes.asObservable();
    this.starredFilter = false;
    this.route.params.subscribe(data => {
      this.user = data['username'];
      console.log(this.me + this.user);
    });
    this.getAll();
  }

  showStarred() {
    if(!this.starredFilter){
      this.getAllStarred();
    }else {
      this.getAll();
    }
  }

  getAllStarred() {
    this.anecdotesService.getStarred(this.user).subscribe(data => {
      var anecdotesTmp: Anecdote[] = [];
      data.anecdotes.forEach((e : any) => {
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
      });
      this.anecdotes.next(anecdotesTmp);
      this.starredFilter = true;
    })
  }

  getAll() {
    this.anecdotesService.getAnecdotesFromUsername(this.user).subscribe(data => {
      var anecdotesTmp: Anecdote[] = [];
      data.anecdotes.forEach((e : any) => {
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
      });
        this.anecdotes.next(anecdotesTmp);
        this.starredFilter = false;
    })
  }

}
