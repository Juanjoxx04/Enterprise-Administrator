import { Injectable, signal } from '@angular/core';
import { USERS_MOCK } from '../mocks/users.mock';
import { User } from './../models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  users = signal<User[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  loadUsers() {
    this.loading.set(true);
    this.error.set(null);

    setTimeout(() => {
      this.users.set(USERS_MOCK);
      this.loading.set(false);
    }, 2000)
  }

}