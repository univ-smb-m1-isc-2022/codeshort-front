import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { AnecdotesService } from 'src/app/services/anecdotes.service';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { Anecdote } from 'src/models/anecdote.model';
import { ProfilCardComponent } from '../profil-card/profil-card.component';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit, AfterViewInit {

  user!: string;
  anecdotes$!: Observable<Anecdote[] | null>;
  @ViewChild('card') card!: ProfilCardComponent;

  constructor(private route: ActivatedRoute) { }

  ngAfterViewInit(): void {
    this.anecdotes$ = this.card.anecdotes.asObservable();
  }
  
  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.user = data['username'];
    });
  }

}
