import { Component, Input } from '@angular/core';
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

  constructor(private anecdotesService: AnecdotesService) { }
  
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
        this.anecdote!.vote = Vote.DOWNVOTE;
        this.anecdotesService.setVote(this.anecdote.id, Vote.DOWNVOTE, this.anecdote.starred).subscribe(data => {
          if (this.anecdote!.vote == Vote.UPVOTE) {
            this.anecdote!.upvotes -= 1;
          }
          this.anecdote!.vote = Vote.DOWNVOTE;
          this.anecdote!.downvotes += 1;
        });
      }
    }
  }
}
