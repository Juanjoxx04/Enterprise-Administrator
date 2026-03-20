import { Component, computed, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { UsersService } from '../../services/users.service';
import { Spinner } from "../../../../shared/components/spinner/spinner.component";
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-users-list',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    Spinner
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css',
})
export class UsersListComponent implements OnInit {

  private usersService = inject(UsersService);

  users = this.usersService.users;
  loading = this.usersService.loading;
  error = this.usersService.error;
  userDisplay = computed(() => {
    return this.users().map(user => ({
      ...user,
      createdAt: formatDate(user.createdAt, 'dd/MM/yyyy', 'en-US')
    }));
  })

  displayedColumns = ['id', 'name', 'email', 'role', 'status', 'createdAt', 'actions'];

  ngOnInit() {
    this.usersService.loadUsers();
  }
}
