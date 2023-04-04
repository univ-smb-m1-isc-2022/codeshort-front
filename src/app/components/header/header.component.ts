import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { AnecdotesService } from 'src/app/services/anecdotes.service';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { Anecdote } from 'src/models/anecdote.model';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user$!: Observable<String | null>;
  searchInput!: String;
  topics: String[] = [];
  searchTopics : String[] = [];
  localStorage: any;

  constructor(private router: Router, public authentificationService: AuthentificationService, private anecdotesService : AnecdotesService) { }

  ngOnInit(): void {

    this.user$ = this.authentificationService.user$;

    this.anecdotesService.getAllTopics().subscribe(data => {
      data.topics.forEach((element: { name: String; }) => {
        this.topics.push(element.name)
      });
    });

    console.log(this.authentificationService.getLinkPicture())

  }

  goToLogin() : void {
    this.router.navigateByUrl('login');
  }

  goToProfil() {
    this.router.navigateByUrl('home/profil/' + this.authentificationService.getUser());
  }

  goToHome() {
    this.router.navigateByUrl('home');
  }

  searchAnecdotes() {
    if(this.searchInput){
      this.searchTopics = [];
      this.searchTopics.push(this.searchInput);
      this.anecdotesService.getAllFromTopics(this.searchTopics).subscribe(data => {
        var tmp : Anecdote[] = [];
        data.anecdotes.forEach((anecdote : any) => {
          tmp.push({
            id: anecdote.id,
            topics: anecdote.topics,
            description: anecdote.content,
            upvotes: anecdote.upvotes,
            downvotes: anecdote.downvotes,
            starred: anecdote.starred,
            owner: anecdote.author,
            vote: anecdote.vote,
            pictureUri: environment.serverKey + "/images/" + anecdote.pictureUri
          });
        });
        this.anecdotesService.setAnecdotes(tmp);
      })
    }
  }
}
