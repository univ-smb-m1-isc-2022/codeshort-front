import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-edit-profil',
  templateUrl: './dialog-edit-profil.component.html',
  styleUrls: ['./dialog-edit-profil.component.scss']
})
export class DialogEditProfilComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogEditProfilComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

    URL: any = null
    file: any = null

    ngOnInit(): void {
      this.URL = this.data.picture
    }

    useImage(event: any) {
      if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        this.file = event.target.files[0];
        reader.readAsDataURL(event.target.files[0]); // Read file as data url
        reader.onloadend = (e) => { // function call once readAsDataUrl is completed
          this.URL = e.target? e.target['result'] : null; // Set image in element
        };
      }
    }

    closeDialog() {
      this.dialogRef.close(this.file);
    }
}
