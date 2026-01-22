import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-math-dialog',
  imports: [FormsModule, MatFormFieldModule, MatDialogModule, MatInputModule, MatButtonModule],
  templateUrl: './math-dialog.html',
  styleUrl: './math-dialog.scss'
})
export class MathDialog {
  protected inputValue = ''

  constructor(
    public dialogRef: MatDialogRef<MathDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancel() {
    this.dialogRef.close()
  }

  onSubmit() {
    this.dialogRef.close(this.inputValue)
  }
}