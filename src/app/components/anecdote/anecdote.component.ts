import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AnecdotesService } from 'src/app/services/anecdotes.service';
import { Anecdote } from 'src/models/anecdote.model';
import { Vote } from 'src/models/vote.model';

@Component({
  selector: 'app-anecdote',
  templateUrl: './anecdote.component.html',
  styleUrls: ['./anecdote.component.scss']
})

export class AnecdoteComponent {
  @Input() anecdote!: Anecdote | null;

  constructor(private anecdotesService: AnecdotesService, private router : Router) { }
  
  upvoteClicked() {
    if (this.anecdote) {
      if (this.anecdote.vote == Vote.UPVOTE) {
        this.anecdotesService.setVote(this.anecdote.id, Vote.NONE, this.anecdote.starred).subscribe(data => {
          this.anecdote!.vote = Vote.NONE;
          this.anecdote!.upvotes -= 1;
        });
      } else {
        this.anecdotesService.setVote(this.anecdote.id, Vote.UPVOTE, this.anecdote.starred).subscribe(data => {
          if (this.anecdote!.vote == Vote.DOWNVOTE) {
            this.anecdote!.downvotes -= 1;
          }
          this.anecdote!.vote = Vote.UPVOTE;
          this.anecdote!.upvotes += 1;
        });
      }
    }
  }

  downvoteClicked() {
    if (this.anecdote) {
      if (this.anecdote.vote == Vote.DOWNVOTE) {
        this.anecdotesService.setVote(this.anecdote.id, Vote.NONE, this.anecdote.starred).subscribe(data => {
          this.anecdote!.vote = Vote.NONE;
          this.anecdote!.downvotes -= 1;
        });
      } else {
        this.anecdotesService.setVote(this.anecdote.id, Vote.DOWNVOTE, this.anecdote.starred).subscribe(data => {
          console.log(this.anecdote?.vote);
          if (this.anecdote!.vote == Vote.UPVOTE) {
            this.anecdote!.upvotes -= 1;
          }
          this.anecdote!.vote = Vote.DOWNVOTE;
          this.anecdote!.downvotes += 1;
        });
      }
    }
  }

  starClicked() {
    if(this.anecdote){
      var newState = !this.anecdote.starred;
      this.anecdotesService.setVote(this.anecdote.id, this.anecdote.vote, newState).subscribe(data => {
        this.anecdote!.starred = newState;
      });
    }
  }

  goToProfil() {
    if(this.anecdote){
      this.router.navigateByUrl('home/profil/' + this.anecdote?.owner);
    }
  }

  goToComment() {
    if (this.anecdote) {
      this.router.navigateByUrl('home/comment/' + this.anecdote.id);
    }
  }

}
