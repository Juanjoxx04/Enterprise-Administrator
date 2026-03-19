import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { UsersService } from '../../services/users.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-users-list',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatChipsModule,
    MatProgressSpinnerModule
],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css',
})
export class UsersListComponent implements OnInit {

  private usersService = inject(UsersService);

  users = this.usersService.users;
  loading = this.usersService.loading;
  error = this.usersService.error;

  displayedColumns = ['id', 'name', 'email', 'role', 'status', 'createdAt', 'actions'];

  ngOnInit() {
    this.usersService.loadUsers();
  }


}
