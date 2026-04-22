import { Component, inject } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-form-create-user.component',
  imports: [
    MatCardModule,
    MatDialogModule,
  ],
  templateUrl: './form-create-user.component.html',
  styleUrl: './form-create-user.component.css',
})
export class FormCreateUserComponent {

  dialogRef = inject(MatDialogRef<FormCreateUserComponent>)

  onSave() {
    this.dialogRef.close(true);
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
