import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Observable, of, Subscription } from "rxjs";
import { AnecdotesService } from "src/app/services/anecdotes.service";
import { Anecdote } from "src/models/anecdote.model";
import { Comment } from "src/models/comment.model";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit, OnDestroy {

  anecdote$!: Observable<Anecdote | null>;
  comments$!: Observable<Comment[]>;
  anecdoteSubscription!: Subscription;
  content!: String;
  anecdoteId!: number;

  constructor(private anecdoteService : AnecdotesService) {}

  ngOnInit(): void {
    this.anecdote$ = this.anecdoteService.anecdote$;
    this.anecdoteSubscription = this.anecdote$.subscribe(data => {
      if(data){
        this.anecdoteId = data.id;
        this.anecdoteService.getAnecdoteComments(this.anecdoteId).subscribe(data => {
          this.comments$ = of(data.comments);
        });
      }
    });
  }

  onSubmitForm(form: NgForm) {
    this.anecdoteService.createComment(form.value, this.anecdoteId).subscribe(() => {
      this.anecdoteService.getAnecdoteComments(this.anecdoteId).subscribe(data => {
        this.comments$ = of(data.comments);
      });
    });

  }

  ngOnDestroy(): void {
    this.anecdoteSubscription.unsubscribe();
  }

}
