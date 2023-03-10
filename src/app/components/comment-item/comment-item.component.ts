import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Comment } from 'src/models/comment.model';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss']
})
export class CommentItemComponent {
  @Input() comment!: Comment;

  constructor ( private router : Router) {}

  goToProfil() {
    this.router.navigateByUrl('home/profil/' + this.comment.author);
  }
}
