import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from "@angular/material/card";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-form-create-user.component',
  imports: [
    MatCardModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
  templateUrl: './users-form.component.html',
  styleUrl: './users-form.component.css',
})
export class UserFormComponent {

  data = inject(MAT_DIALOG_DATA)
  dialogRef = inject(MatDialogRef<UserFormComponent>)

  form = new FormGroup({
    name: new FormControl(this.data?.user?.name ?? '', Validators.required),
    email: new FormControl(this.data?.user?.email ?? '', [Validators.required, Validators.email]),
    role: new FormControl(this.data?.user?.role ?? '', Validators.required),
    status: new FormControl(this.data?.user?.status ?? '', Validators.required)
  })

  onSave() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
