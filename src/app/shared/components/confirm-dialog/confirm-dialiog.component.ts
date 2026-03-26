import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog'

@Component({
  selector: 'app-confirm-dialiog.component',
  imports: [
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './confirm-dialiog.component.html',
  styleUrl: './confirm-dialiog.component.css',
})
export class ConfirmDialiogComponent {

  data = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<ConfirmDialiogComponent>);

  onConfirm() {
    this.dialogRef.close(true);
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}