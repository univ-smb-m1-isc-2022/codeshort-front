import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-report',
  templateUrl: './dialog-report.component.html',
  styleUrls: ['./dialog-report.component.scss']
})
export class DialogReportComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogReportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}


    ngOnInit(): void {
    }

    closeDialog(text: string) {
      this.dialogRef.close(text);
    }
}
