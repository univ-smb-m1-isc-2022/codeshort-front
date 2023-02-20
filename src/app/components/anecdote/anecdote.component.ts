import { Component, Input } from '@angular/core';
import { AnecdotesService } from 'src/app/services/anecdotes.service';
import { Anecdote } from 'src/models/anecdote.model';

@Component({
  selector: 'app-anecdote',
  templateUrl: './anecdote.component.html',
  styleUrls: ['./anecdote.component.scss']
})

export class AnecdoteComponent {
  @Input() anecdote!: Anecdote | null;

  constructor(private anecdotesService: AnecdotesService) {}
}
