import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, of, Subscription } from "rxjs";
import { AnecdotesService } from "src/app/services/anecdotes.service";
import { Anecdote } from "src/models/anecdote.model";
import { Comment } from "src/models/comment.model";
import { environment } from 'src/environment/environment';

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

  constructor(private anecdoteService : AnecdotesService, public router : Router) {}

  ngOnInit(): void {
    this.anecdote$ = this.anecdoteService.anecdote$;
    this.anecdoteSubscription = this.anecdote$.subscribe(data => {
      if(data){
        this.anecdoteId = data.id;
        this.anecdoteService.getAnecdoteComments(this.anecdoteId).subscribe(data => {
          this.comments$ = of(data.comments);
        });
      }else{
        let url = this.router.url;
        let urlSplit = url.split('/');
        this.anecdoteService.getOneAnecdote(parseInt(urlSplit[urlSplit.length-1])).subscribe(data => {
          console.log(data);
          let anecdote = {
            id: data.anecdote.id,
            topics: data.anecdote.topics,
            description: data.anecdote.content,
            upvotes: data.anecdote.upvotes,
            downvotes: data.anecdote.downvotes,
            starred: data.anecdote.starred,
            owner: data.anecdote.author,
            vote: data.anecdote.vote,
            pictureUri: environment.serverKey + "/images/" + data.anecdote.pictureUri
          }
          let anecdotes = [anecdote];
          this.anecdoteService.setAnecdotes(anecdotes);
          this.anecdoteService.getAnecdoteComments(anecdote.id).subscribe(data => {
            this.comments$ = of(data.comments);
          });
        });
      }
    });
  }

  onSubmitForm(form: NgForm) {
    if(form.value.content && form.value.content != '') {
      this.anecdoteService.createComment(form.value, this.anecdoteId).subscribe(() => {
        this.anecdoteService.getAnecdoteComments(this.anecdoteId).subscribe(data => {
          this.comments$ = of(data.comments);
        });
      });
    }
  }

  ngOnDestroy(): void {
    this.anecdoteSubscription.unsubscribe();
  }

}
