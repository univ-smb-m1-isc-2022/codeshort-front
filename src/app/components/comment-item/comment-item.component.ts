import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AnecdotesService } from 'src/app/services/anecdotes.service';
import { Comment } from 'src/models/comment.model';
import { Vote } from 'src/models/vote.model';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss']
})
export class CommentItemComponent {
  @Input() comment!: Comment;
  @Input() anecdoteId!: number;

  constructor ( private router : Router, private anecdoteService : AnecdotesService) {}

  upvoteClicked() {
    if (this.comment) {
      if (this.comment.vote == Vote.UPVOTE) {
        this.anecdoteService.setVoteComment(this.anecdoteId, this.comment.id, Vote.NONE).subscribe(data => {
          this.comment!.vote = Vote.NONE;
          this.comment!.upvotes -= 1;
        });
      } else {
        this.anecdoteService.setVoteComment(this.anecdoteId, this.comment.id, Vote.UPVOTE).subscribe(data => {
          if (this.comment!.vote == Vote.DOWNVOTE) {
            this.comment!.downvotes -= 1;
          }
          this.comment!.vote = Vote.UPVOTE;
          this.comment!.upvotes += 1;
        });
      }
    }
  }

  downvoteClicked() {
    if (this.comment) {
      if (this.comment.vote == Vote.DOWNVOTE) {
        this.anecdoteService.setVoteComment(this.anecdoteId, this.comment.id, Vote.NONE).subscribe(data => {
          this.comment!.vote = Vote.NONE;
          this.comment!.downvotes -= 1;
        });
      } else {
        this.anecdoteService.setVoteComment(this.anecdoteId, this.comment.id, Vote.DOWNVOTE).subscribe(data => {
          if (this.comment!.vote == Vote.UPVOTE) {
            this.comment!.upvotes -= 1;
          }
          this.comment!.vote = Vote.DOWNVOTE;
          this.comment!.downvotes += 1;
        });
      }
    }
  }

  goToProfil() {
    this.router.navigateByUrl('home/profil/' + this.comment.author);
  }
}
