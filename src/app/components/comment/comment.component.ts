import { Component, OnInit } from "@angular/core";
import { Observable, of } from "rxjs";
import { Anecdote } from "src/models/anecdote.model";
import { Comment } from "src/models/comment.model";
import { Vote } from "src/models/vote.model";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  anecdote$!: Observable<Anecdote>;
  comments$!: Observable<Comment[]>;

  ngOnInit(): void {
    this.anecdote$ = of({
      id: 0,
      topics: ["Javascript"],
      description: "test",
      upvotes: 0,
      downvotes: 0,
      starred: false,
      owner: "test",
      vote: Vote.NONE
    });

    var comment1: Comment = { content: "hello", author: "Mathis" };
    this.comments$ = of(
      [
        comment1,
        comment1,
        comment1,
        comment1,
        comment1
      ]
    )
  }
}
