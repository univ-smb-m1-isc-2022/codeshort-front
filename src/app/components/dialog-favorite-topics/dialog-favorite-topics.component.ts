import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnecdotesService } from 'src/app/services/anecdotes.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dialog-favorite-topics',
  templateUrl: './dialog-favorite-topics.component.html',
  styleUrls: ['./dialog-favorite-topics.component.scss']
})
export class DialogFavoriteTopicsComponent {

  topics: string[] = [];
  selectedTopics: string[] = [];
  content!: string;
  selectedTopic!: string;

  constructor( 
    public dialogRef: MatDialogRef<DialogFavoriteTopicsComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private anecdotesService : AnecdotesService, 
    private userService : UserService
  ) {}

  ngOnInit(): void {
    this.anecdotesService.getAllTopics().subscribe(data => {
      data.topics.forEach((element: { name: string; }) => {
        this.topics.push(element.name)
      });
    })
  }

  closeDialog(topics: string[]) {
    this.dialogRef.close(topics);
  }

  addToTopics() : void {
    var topic = this.topics.filter(
      (item) => item === this.selectedTopic
    );
      if(!this.selectedTopics.includes(topic[0]) && this.selectedTopics.length < 5) this.selectedTopics.push(topic[0]);
  }

  removeFromTopics(topic: string): void{
    let index = this.selectedTopics.indexOf(topic);
    if (index > -1) {
      this.selectedTopics.splice(index, 1); // 2nd parameter means remove one item only
    }
  }
}
