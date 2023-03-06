import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { Anecdote } from 'src/models/anecdote.model';
import { Vote } from 'src/models/vote.model';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  user$!: Observable<String | null>;

  anecdotes: Anecdote[] = [
    {
        id: 0,
        topics: ["JS","Humour","Back"],
        description: "Test 1",
        upvotes: 5,
        downvotes: 6,
        starred: true,
        owner: "Mathis",
        vote: Vote.NONE
    },
    {
        id: 1,
        topics: ["Python","Humour","Front"],
        description: "Test 2",
        upvotes: 2,
        downvotes: 3,
        starred: true,
        owner: "Mathis",
        vote: Vote.NONE
    },
    {
        id: 2,
        topics: ["JS","Serieux","Back"],
        description: "Test 3",
        upvotes: 7,
        downvotes: 8,
        starred: true,
        owner: "Mathis",
        vote: Vote.NONE
    }
]

  constructor(private router: Router, private authentificationService: AuthentificationService) { }
  
  ngOnInit(): void {
    this.user$ = this.authentificationService.user$;
  }

}
