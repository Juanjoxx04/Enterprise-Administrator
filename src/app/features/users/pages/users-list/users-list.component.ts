import { formatDate } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { debounceTime, switchMap } from 'rxjs';
import { ConfirmDialiogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialiog.component';
import { Spinner } from "../../../../shared/components/spinner/spinner.component";
import { UserFormComponent } from '../../../../shared/users/users-form/users-form.component';
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
    MatDialogModule,
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css',
})
export class UsersListComponent {

  private usersService = inject(UsersService);

  dialog = inject(MatDialog);
  users = signal<User[]>([]);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);
  query = signal('');
  userDisplay = computed(() => {
    return this.users().map(user => ({
      ...user,
      createdAt: formatDate(user.createdAt, 'dd/MM/yyyy', 'en-US')
    }));
  })

  displayedColumns = ['id', 'name', 'email', 'role', 'status', 'createdAt', 'actions'];

  constructor() {
    toObservable(this.query).pipe(
      debounceTime(300),
      switchMap(q => {
        this.loading.set(true);
        this.error.set(null);
        return q.trim() ? this.usersService.search(q) : this.usersService.getAll();
      }),
      takeUntilDestroyed()).subscribe({
        next: (res) => {
          this.users.set(res);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('no se encontro el usuario');
          this.loading.set(false);
        }
      })
  }

  createuserDialog() {
    const dialogRef = this.dialog.open(UserFormComponent, {
      data: {
        title: 'Crear usuario',
        save: 'Guardar'
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.create(res);
      }
    })
  }

  create(user: User) {
    this.usersService.create(user).subscribe({
      next: (res) => {
        this.users.set([...this.users(), res]);
      },
      error: () => {
        this.error.set('Error al crear el usuario');
        this.loading.set(false);
      }
    })
  }

  updateDialog(user: User) {
    const dialogRef = this.dialog.open(UserFormComponent, {
      data: {
        title: 'Editar Usuario',
        save: 'Editar',
        user
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.update(user.id, res);
      }
    })
  }

  update(id: string, user: User) {
    this.usersService.update(id, user).subscribe({
      next: (res) => {
        this.users.set(this.users().map(u => u.id === id ? res : u));
      },
      error: () => {
        this.error.set('Error al editar el usuario');
        this.loading.set(false);
      }
    })
  }

  deleteDialog(users: User) {
    const dialogRef = this.dialog.open(ConfirmDialiogComponent, {
      data: {
        title: 'Eliminar usuario',
        message: `Desea eliminar el usuario de ${users.name}`
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.onDelete(users.id);
      }
    })
  }

  onDelete(id: string) {
    this.usersService.delete(id).subscribe({
      next: () => {
        this.users.set(this.users().filter(u => u.id !== id));
      },
      error: () => {
        this.error.set(`Error al eliminar el usuario`);
      }
    })
  }
}
