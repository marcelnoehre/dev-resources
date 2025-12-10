import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  imports: [MatButtonModule],
  templateUrl: './dialog.html',
  styleUrl: './dialog.scss'
})
export class Dialog {

  constructor(
    public dialogRef: MatDialogRef<Dialog>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, content: string, action: string }
  ) {}

  close(): void {
    this.dialogRef.close();
  }

}
