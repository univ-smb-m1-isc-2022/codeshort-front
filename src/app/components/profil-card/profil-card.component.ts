import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AnecdotesService } from 'src/app/services/anecdotes.service';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { Anecdote } from 'src/models/anecdote.model';

@Component({
  selector: 'app-profil-card',
  templateUrl: './profil-card.component.html',
  styleUrls: ['./profil-card.component.scss']
})
export class ProfilCardComponent implements OnInit {
  @Input() user!: string;
  anecdotes = new BehaviorSubject<Anecdote[] | null>(null);
  me: string | null = this.authentificationService.getUser();
  starredFilter!: boolean;

  constructor(private authentificationService: AuthentificationService, private anecdotesService: AnecdotesService) { }
  
  ngOnInit(): void {
    this.starredFilter = false;
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
