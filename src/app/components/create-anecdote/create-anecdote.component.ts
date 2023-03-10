import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AnecdotesService } from 'src/app/services/anecdotes.service';

@Component({
  selector: 'app-create-anecdote',
  templateUrl: './create-anecdote.component.html',
  styleUrls: ['./create-anecdote.component.scss']
})
export class CreateAnecdoteComponent implements OnInit {

  topics: String[] = [];
  selectedTopics: String[] = [];
  content!: String;
  selectedTopic!: String;

  constructor(
    private anecdotesService: AnecdotesService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.anecdotesService.getAllTopics().subscribe(data => {
      data.topics.forEach((element: { name: String; }) => {
        this.topics.push(element.name)
      });
    })
  }

  onSubmitForm(form: NgForm) {
    if (this.selectedTopics.length != 0) this.anecdotesService.createAnecdote(form.value.content, this.selectedTopics).subscribe(() => this.goToHome());
  }

  goToHome() : void {
    this.router.navigateByUrl('home');
  }

  addToTopics() : void {
    var topic = this.topics.filter(
      (item) => item === this.selectedTopic
    );
     if(!this.selectedTopics.includes(topic[0])) this.selectedTopics.push(topic[0]);
  }

  removeFromTopics(topic: String): void{
    let index = this.selectedTopics.indexOf(topic);
    if (index > -1) {
      this.selectedTopics.splice(index, 1); // 2nd parameter means remove one item only
    }
  }
}
