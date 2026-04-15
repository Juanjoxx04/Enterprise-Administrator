import { formatDate } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { ConfirmDialiogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialiog.component';
import { Spinner } from "../../../../shared/components/spinner/spinner.component";
import { User } from '../../models/user';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users-list',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    Spinner,
    MatDialogModule
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css',
})
export class UsersListComponent implements OnInit {

  private usersService = inject(UsersService);

  dialog = inject(MatDialog);
  users = signal<User[]>([]);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);
  userDisplay = computed(() => {
    return this.users().map(user => ({
      ...user,
      createdAt: formatDate(user.createdAt, 'dd/MM/yyyy', 'en-US')
    }));
  })

  displayedColumns = ['id', 'name', 'email', 'role', 'status', 'createdAt', 'actions'];

  ngOnInit(): void {
    this.usersService.get().subscribe({
      next: (data) => {
        this.users.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Error al cargar los usuarios');
        this.loading.set(false);
      }
    })
  }

  openDeleteDialog(users: User) {
    const dialogRef = this.dialog.open(ConfirmDialiogComponent, {
      data: {
        title: 'Eliminar usuario',
        message: `Desea eliminar el usuario de ${users.name}`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onDelete(users.id);
      }
    })
  }

  onDelete(id: string) {
    // this.usersService.delete(id);
  }
}
